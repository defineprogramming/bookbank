import React, { Component } from 'react';
import reviewService from '../services/reviewService';

class Review extends Component {
    state = {
        reviews: [],
        loading: true,
    };

    async componentDidMount() {
        const reviews = await reviewService.getAllReviews();
        this.setState({ reviews, loading: false });
    }

    render() {
        const { reviews, loading } = this.state;

        if (loading) {
            return <div>Loading...</div>;
        }

        return (
            <div className="reviews">
                {reviews.map((review) => (
                    <div key={review._id} className="review">
                        <h2>{review.title}</h2>
                        <h3>By {review.author}</h3>
                        <p>{review.text}</p>
                        <div className="rating">
                            {Array(review.rating).fill().map((_, i) => (
                                <span key={i}>⭐</span>
                            ))}
                        </div>
                        <div className="tags">
                            {review.tags.map((tag, index) => (
                                <span key={index} className="tag">{tag}</span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        );
    }
}

export default Review;