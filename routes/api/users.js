const express = require('express');
const router = express.Router();

const User = require('../../models/User');

// @route   GET api/users
// @desc    Test Route
// @access: Public
router.get('/', (req, res) => res.send('Regiser a user'));

module.exports = router;
