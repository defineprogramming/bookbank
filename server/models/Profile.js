const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    avatar: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        required: true
    },
    favoriteBooks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book'
    }],
    favoriteGenres: {
        type: [String],
        required: true
    },
    readingList: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book'
    }],
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review'
    }],
    forums: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Forum'
    }],
    challenges: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Challenge'
    }],
    authors: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author'
    }],
    blogs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog'
    }],
    socials: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Social'
    }],
    recommendations: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Recommendation'
    }]
});

module.exports = mongoose.model('Profile', ProfileSchema);