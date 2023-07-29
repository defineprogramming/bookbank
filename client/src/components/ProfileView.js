import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import profileService from '../services/profileService';
import Bookshelf from './Bookshelf';

const ProfileView = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const fetchedProfile = await profileService.getProfile(id);
      setProfile(fetchedProfile);
    };
    fetchProfile();
  }, [id]);

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-view">
      <div className="profile-header">
        <img src={profile.avatar} alt={profile.username} />
        <h2>{profile.username}</h2>
        <p>{profile.bio}</p>
      </div>
      <div className="profile-books">
        <h3>Favorite Books</h3>
        <Bookshelf books={profile.favoriteBooks} />
      </div>
      <div className="profile-genres">
        <h3>Favorite Genres</h3>
        <ul>
          {profile.favoriteGenres.map((genre) => (
            <li key={genre}>{genre}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProfileView;