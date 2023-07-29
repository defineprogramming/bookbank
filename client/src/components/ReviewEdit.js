import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import reviewService from '../services/reviewService';

const ReviewEdit = () => {
  const [review, setReview] = useState({ title: '', text: '', rating: 0, tags: [] });
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    const fetchReview = async () => {
      const fetchedReview = await reviewService.getReview(id);
      setReview(fetchedReview);
    };
    fetchReview();
  }, [id]);

  const handleInputChange = (event) => {
    setReview({ ...review, [event.target.name]: event.target.value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    await reviewService.updateReview(id, review);
    history.push(`/reviews/${id}`);
  };

  return (
    <div>
      <h2>Edit Review</h2>
      <form onSubmit={handleFormSubmit}>
        <label>
          Title:
          <input type="text" name="title" value={review.title} onChange={handleInputChange} required />
        </label>
        <label>
          Text:
          <textarea name="text" value={review.text} onChange={handleInputChange} required />
        </label>
        <label>
          Rating:
          <input type="number" name="rating" min="1" max="5" value={review.rating} onChange={handleInputChange} required />
        </label>
        <label>
          Tags:
          <input type="text" name="tags" value={review.tags.join(', ')} onChange={(event) => setReview({ ...review, tags: event.target.value.split(', ') })} />
        </label>
        <button type="submit">Update Review</button>
      </form>
    </div>
  );
};

export default ReviewEdit;