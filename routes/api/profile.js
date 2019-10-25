const express = require('express');
const expressRouter = express.Router;
const router = expressRouter();
const auth = require('../../middleware//auth');
const {
    check,
    validationResult
} = require('express-validator');


const Profile = require('../../models/Profiles');
const User = require('../../models/Users');


// @route   GET api/profile/me
// @desc    Get current user profile 
// @acces   Private
router.get('/me', auth, async (req, res) => {
    try {

        // Get profile
        const profile = await Profile.findOne({
            user: req.user.id
        }).populate('user', ['name', 'avatar']);

        if (!proifle) {
            return res.status(400).json({
                msg: 'There is no profile for this user!'
            });
        }

    } catch (err) {
        console.eror(err.message);
        res.status(500).send('Server Error!');
    }
});



// @route   POST api/profile/me
// @desc    Create or update user profile 
// @acces   Private
router.post('/', [auth, [
    check('status', 'Status is required!').not().isEmpty(),
    check('skills', 'Skill is required!').not().isEmpty()
]], async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(404).json({
            errors: errors.array()
        });
    }

    const {
        company,
        website,
        location,
        bio,
        status,
        githubusername,
        skills,
        youtube,
        facebook,
        twitter,
        instagram,
        lindkedin
    } = req.body;


    // Build profile object
    const profileFields = {};
    profileFields.user = req.user.id;

    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;
    if (githubusername) profileFields.githubusername = githubusername;
    if (skills) {
        profileFields.skills = skills.split(',').map(skill => skill.trim());
    }

    // Build social object
    profileFields.social = {}
    if (youtube) profileFields.social.youtube = youtube;
    if (twitter) profileFields.social.twitter = twitter;
    if (facebook) profileFields.social.facebook = facebook;
    if (lindkedin) profileFields.social.lindkedin = lindkedin;
    if (instagram) profileFields.social.instagram = instagram;


    try {
        let profile = await Profile.findOne({
            user: req.user.id
        });

        // Update
        if (profile) {

            profile = await Profile.findOneAndUpdate({
                user: req.user.id
            }, {
                $set: profileFields
            }, {
                new: true
            });

            return res.json(profile);
        }

        // Create
        profile = new Profile(profileFields);

        await profile.save();

        res.json(profile);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error!')
    }
});




module.exports = router;