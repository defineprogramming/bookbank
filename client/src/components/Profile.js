import React, { Component } from 'react';
import profileService from '../services/profileService';
import { Link } from 'react-router-dom';

class Profile extends Component {
    state = {
        profile: {
            avatar: '',
            bio: '',
            favoriteBooks: [],
            favoriteGenres: []
        }
    };

    async componentDidMount() {
        const { data: profile } = await profileService.getProfile(this.props.match.params.id);
        this.setState({ profile });
    }

    render() {
        const { profile } = this.state;
        return (
            <div className="profile">
                <img src={profile.avatar} alt="Avatar" className="profile-avatar" />
                <h2 className="profile-name">{profile.name}</h2>
                <p className="profile-bio">{profile.bio}</p>
                <h3>Favorite Books</h3>
                <ul className="profile-books">
                    {profile.favoriteBooks.map(book => (
                        <li key={book._id}>
                            <Link to={`/book/${book._id}`}>{book.title}</Link>
                        </li>
                    ))}
                </ul>
                <h3>Favorite Genres</h3>
                <ul className="profile-genres">
                    {profile.favoriteGenres.map(genre => (
                        <li key={genre}>{genre}</li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default Profile;