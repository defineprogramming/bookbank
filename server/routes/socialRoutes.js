const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');

const User = require('../models/User');
const Social = require('../models/Social');

// @route   GET api/social
// @desc    Get all users' social activities
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const socials = await Social.find().sort({ date: -1 });
    res.json(socials);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/social
// @desc    Add new social activity
// @access  Private
router.post(
  '/',
  [
    auth,
    [
      check('text', 'Text is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const newSocial = new Social({
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar,
        user: req.user.id
      });

      const social = await newSocial.save();

      res.json(social);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   DELETE api/social/:id
// @desc    Delete social activity
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    let social = await Social.findById(req.params.id);

    if (!social) return res.status(404).json({ msg: 'Social activity not found' });

    // Make sure user owns the social activity
    if (social.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    await Social.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Social activity removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;