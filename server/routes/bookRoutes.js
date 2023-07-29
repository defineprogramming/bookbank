const express = require('express');
const router = express.Router();
const Book = require('../models/Book');
const auth = require('../middleware/auth');

// Get all books
router.get('/', async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get one book
router.get('/:id', getBook, (req, res) => {
    res.json(res.book);
});

// Create one book
router.post('/', auth, async (req, res) => {
    const book = new Book({
        title: req.body.title,
        author: req.body.author,
        coverImage: req.body.coverImage,
        description: req.body.description,
        genres: req.body.genres
    });

    try {
        const newBook = await book.save();
        res.status(201).json(newBook);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update one book
router.patch('/:id', auth, getBook, async (req, res) => {
    if (req.body.title != null) {
        res.book.title = req.body.title;
    }
    if (req.body.author != null) {
        res.book.author = req.body.author;
    }
    if (req.body.coverImage != null) {
        res.book.coverImage = req.body.coverImage;
    }
    if (req.body.description != null) {
        res.book.description = req.body.description;
    }
    if (req.body.genres != null) {
        res.book.genres = req.body.genres;
    }
    try {
        const updatedBook = await res.book.save();
        res.json(updatedBook);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete one book
router.delete('/:id', auth, getBook, async (req, res) => {
    try {
        await res.book.remove();
        res.json({ message: 'Deleted Book' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Middleware function for get by ID
async function getBook(req, res, next) {
    let book;
    try {
        book = await Book.findById(req.params.id);
        if (book == null) {
            return res.status(404).json({ message: 'Cannot find book' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.book = book;
    next();
}

module.exports = router;