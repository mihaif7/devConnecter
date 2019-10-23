const express = require('express');
const expressRouter = express.Router;
const router = expressRouter();


// @route   GET api/profile
// @desc    Test route
// @acces   Public
router.get('/', (req, res) => res.send('Profile route'));


module.exports = router;