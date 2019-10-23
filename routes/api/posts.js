const express = require('express');
const expressRouter = express.Router;
const router = expressRouter();


// @route   GET api/posts
// @desc    Test route
// @acces   Public
router.get('/', (req, res) => res.send('Posts route'));


module.exports = router;