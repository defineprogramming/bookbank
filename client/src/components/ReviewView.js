import React, { Component } from 'react';
import reviewService from '../services/reviewService';

class ReviewView extends Component {
    state = {
        review: null
    };

    async componentDidMount() {
        const { id } = this.props.match.params;
        const review = await reviewService.getReview(id);
        this.setState({ review });
    }

    render() {
        const { review } = this.state;

        if (!review) return <div>Loading...</div>;

        return (
            <div className="review-view">
                <h2>{review.title}</h2>
                <h3>By {review.author}</h3>
                <p>{review.text}</p>
                <div className="review-rating">
                    Rating: {review.rating} stars
                </div>
                <div className="review-tags">
                    Tags: {review.tags.join(', ')}
                </div>
            </div>
        );
    }
}

export default ReviewView;