import React, { Component } from 'react';
import recommendationService from '../services/recommendationService';

class Recommendation extends Component {
    state = {
        recommendations: []
    };

    async componentDidMount() {
        const recommendations = await recommendationService.getRecommendations();
        this.setState({ recommendations });
    }

    render() {
        return (
            <div className="recommendations">
                <h2>Recommendations</h2>
                {this.state.recommendations.length === 0 && <p>No recommendations found.</p>}
                {this.state.recommendations.map(recommendation => (
                    <div key={recommendation._id} className="recommendation">
                        <h3>{recommendation.title}</h3>
                        <p>{recommendation.description}</p>
                        <p>Genre: {recommendation.genre}</p>
                        <p>Author: {recommendation.author}</p>
                        <p>Rating: {recommendation.rating}</p>
                    </div>
                ))}
            </div>
        );
    }
}

export default Recommendation;