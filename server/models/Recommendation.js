const mongoose = require('mongoose');

const RecommendationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
        required: true
    },
    recommendedOn: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Recommendation', RecommendationSchema);