import React, { Component } from 'react';
import challengeService from '../services/challengeService';

class ChallengeView extends Component {
    state = {
        challenge: null
    };

    async componentDidMount() {
        const { id } = this.props.match.params;
        const challenge = await challengeService.getChallenge(id);
        this.setState({ challenge });
    }

    render() {
        const { challenge } = this.state;

        if (!challenge) return <div>Loading...</div>;

        return (
            <div className="challenge-view">
                <h2>{challenge.title}</h2>
                <p>{challenge.description}</p>
                <div className="challenge-progress">
                    <h3>Progress</h3>
                    <p>{challenge.progress}</p>
                </div>
                <div className="challenge-participants">
                    <h3>Participants</h3>
                    <ul>
                        {challenge.participants.map(participant => (
                            <li key={participant._id}>{participant.name}</li>
                        ))}
                    </ul>
                </div>
            </div>
        );
    }
}

export default ChallengeView;