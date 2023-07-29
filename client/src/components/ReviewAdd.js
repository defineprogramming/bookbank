import React, { useState } from 'react';
import reviewService from '../services/reviewService';

const ReviewAdd = () => {
  const [bookTitle, setBookTitle] = useState('');
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [tags, setTags] = useState('');

  const handleTitleChange = (event) => {
    setBookTitle(event.target.value);
  };

  const handleRatingChange = (event) => {
    setRating(event.target.value);
  };

  const handleReviewTextChange = (event) => {
    setReviewText(event.target.value);
  };

  const handleTagsChange = (event) => {
    setTags(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const reviewData = {
      bookTitle,
      rating,
      reviewText,
      tags,
    };

    try {
      await reviewService.addReview(reviewData);
      setBookTitle('');
      setRating(0);
      setReviewText('');
      setTags('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Add a Review</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Book Title</label>
          <input type="text" value={bookTitle} onChange={handleTitleChange} required />
        </div>
        <div>
          <label>Rating</label>
          <input type="number" min="1" max="5" value={rating} onChange={handleRatingChange} required />
        </div>
        <div>
          <label>Review</label>
          <textarea value={reviewText} onChange={handleReviewTextChange} required />
        </div>
        <div>
          <label>Tags</label>
          <input type="text" value={tags} onChange={handleTagsChange} />
        </div>
        <button type="submit">Submit Review</button>
      </form>
    </div>
  );
};

export default ReviewAdd;