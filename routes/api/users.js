const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');

// @route   POST api/users
// @desc    Register user
// @access: Public
router.post(
  '/',
  [
    check('name', 'Please include a name').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    // if there are errors return status 400 and send array of error messages
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    // See if user exists
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
    }

    // Get user's gravatar
    const avatar = gravatar.url(email, { s: '200', r: 'pg', d: 'mm' });

    // this creates new user but doesn't save it. B4 saving, encrypt the pwd
    user = new User({
      name,
      email,
      avatar,
      password,
    });

    // Encrypt pwd
    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(password, salt);

    await user.save(); // save to db

    // Return jwt  - so when user registers he's logged in right away
    const payload = {
      user: {
        id: user.id, // mongoose lets u use .id even tho mongo uses ._id
      },
    };

    jwt.sign(
      payload,
      config.get('jwtSecret'),
      {
        expiresIn: 360000,
      },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );

    try {
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
