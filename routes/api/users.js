const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');

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
      'Pleas enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
  ],
  (req, res) => {
    const errors = validationResult(req);
    // if there are errors return status 400 and send array of error messages
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // See if user exists

    // Get user's gravatar

    // Encrypt pwd

    // Return jwt  - so when user registers he's logged in right away

    res.send('User route');
  }
);

module.exports = router;
