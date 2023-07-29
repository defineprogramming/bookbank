const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');

const Forum = require('../models/Forum');
const User = require('../models/User');

// @route   GET api/forums
// @desc    Get all forums
// @access  Public
router.get('/', async (req, res) => {
  try {
    const forums = await Forum.find().sort({ date: -1 });
    res.json(forums);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/forums
// @desc    Create a forum
// @access  Private
router.post(
  '/',
  [
    auth,
    [
      check('title', 'Title is required')
        .not()
        .isEmpty(),
      check('description', 'Description is required')
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
      const user = await User.findById(req.user.id).select('-password');

      const newForum = new Forum({
        title: req.body.title,
        description: req.body.description,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id
      });

      const forum = await newForum.save();

      res.json(forum);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   DELETE api/forums/:id
// @desc    Delete a forum
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const forum = await Forum.findById(req.params.id);

    if (!forum) {
      return res.status(404).json({ msg: 'Forum not found' });
    }

    // Check user
    if (forum.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await forum.remove();

    res.json({ msg: 'Forum removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Forum not found' });
    }
    res.status(500).send('Server Error');
  }
});

module.exports = router;