import React, { Component } from 'react';
import forumService from '../services/forumService';

class Forum extends Component {
    state = {
        forums: []
    };

    async componentDidMount() {
        const forums = await forumService.getAllForums();
        this.setState({ forums });
    }

    render() {
        return (
            <div className="forum-container">
                <h2>Forums</h2>
                {this.state.forums.map(forum => (
                    <div key={forum._id} className="forum-card">
                        <h3>{forum.title}</h3>
                        <p>{forum.description}</p>
                        <a href={`/forum/${forum._id}`}>Go to forum</a>
                    </div>
                ))}
            </div>
        );
    }
}

export default Forum;