import React, { Component } from 'react';
import challengeService from '../services/challengeService';

class Challenge extends Component {
    state = {
        challenges: []
    };

    async componentDidMount() {
        const challenges = await challengeService.getAllChallenges();
        this.setState({ challenges });
    }

    render() {
        return (
            <div className="challenge-container">
                <h2>Reading Challenges</h2>
                {this.state.challenges.map(challenge => (
                    <div key={challenge._id} className="challenge-card">
                        <h3>{challenge.title}</h3>
                        <p>{challenge.description}</p>
                        <p>Goal: {challenge.goal}</p>
                        <p>Progress: {challenge.progress}</p>
                        <button onClick={() => this.handleJoin(challenge._id)}>Join Challenge</button>
                    </div>
                ))}
            </div>
        );
    }

    handleJoin = async (id) => {
        await challengeService.joinChallenge(id);
        const challenges = await challengeService.getAllChallenges();
        this.setState({ challenges });
    }
}

export default Challenge;