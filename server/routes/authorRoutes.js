const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');

const Author = require('../models/Author');

// @route   GET api/authors
// @desc    Get all authors
// @access  Public
router.get('/', async (req, res) => {
  try {
    const authors = await Author.find().sort({ date: -1 });
    res.json(authors);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/authors
// @desc    Add new author
// @access  Private
router.post(
  '/',
  [
    auth,
    [
      check('name', 'Name is required').not().isEmpty(),
      check('bio', 'Bio is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, bio } = req.body;

    try {
      const newAuthor = new Author({
        name,
        bio,
        user: req.user.id,
      });

      const author = await newAuthor.save();

      res.json(author);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   PUT api/authors/:id
// @desc    Update author
// @access  Private
router.put('/:id', auth, async (req, res) => {
  const { name, bio } = req.body;

  // Build author object
  const authorFields = {};
  if (name) authorFields.name = name;
  if (bio) authorFields.bio = bio;

  try {
    let author = await Author.findById(req.params.id);

    if (!author) return res.status(404).json({ msg: 'Author not found' });

    // Make sure user owns author
    if (author.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    author = await Author.findByIdAndUpdate(
      req.params.id,
      { $set: authorFields },
      { new: true }
    );

    res.json(author);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/authors/:id
// @desc    Delete author
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    let author = await Author.findById(req.params.id);

    if (!author) return res.status(404).json({ msg: 'Author not found' });

    // Make sure user owns author
    if (author.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    await Author.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Author removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;