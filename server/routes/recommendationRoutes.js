const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');

const Recommendation = require('../models/Recommendation');
const User = require('../models/User');

// @route   GET api/recommendations
// @desc    Get all recommendations
// @access  Public
router.get('/', async (req, res) => {
  try {
    const recommendations = await Recommendation.find().sort({ date: -1 });
    res.json(recommendations);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/recommendations
// @desc    Add new recommendation
// @access  Private
router.post(
  '/',
  [
    auth,
    [
      check('title', 'Title is required')
        .not()
        .isEmpty(),
      check('author', 'Author is required')
        .not()
        .isEmpty(),
      check('genre', 'Genre is required')
        .not()
        .isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, author, genre } = req.body;

    try {
      const newRecommendation = new Recommendation({
        title,
        author,
        genre,
        user: req.user.id,
      });

      const recommendation = await newRecommendation.save();

      res.json(recommendation);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   PUT api/recommendations/:id
// @desc    Update recommendation
// @access  Private
router.put('/:id', auth, async (req, res) => {
  const { title, author, genre } = req.body;

  // Build recommendation object
  const recommendationFields = {};
  if (title) recommendationFields.title = title;
  if (author) recommendationFields.author = author;
  if (genre) recommendationFields.genre = genre;

  try {
    let recommendation = await Recommendation.findById(req.params.id);

    if (!recommendation) return res.status(404).json({ msg: 'Recommendation not found' });

    // Make sure user owns recommendation
    if (recommendation.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    recommendation = await Recommendation.findByIdAndUpdate(
      req.params.id,
      { $set: recommendationFields },
      { new: true }
    );

    res.json(recommendation);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/recommendations/:id
// @desc    Delete recommendation
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    let recommendation = await Recommendation.findById(req.params.id);

    if (!recommendation) return res.status(404).json({ msg: 'Recommendation not found' });

    // Make sure user owns recommendation
    if (recommendation.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    await Recommendation.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Recommendation removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;