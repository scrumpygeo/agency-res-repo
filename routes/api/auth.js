const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const auth = require('../../middleware/auth');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');
const { exists } = require('../../models/User');

// @route   GET api/auth
// @desc    Test Route
// @access: Private
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password'); // req.user comes from middleware - id is contained in token
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST api/auth
// @desc    Authenticate user & get token
// @access: Public
router.post(
  '/',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required.').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    // if there are errors return status 400 and send array of error messages
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    // See if user exists
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] });
    }

    // Match email and pwd. user.password is the encrypted pwd; password is the plain text one:
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] });
    }

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
