import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import profileService from '../services/profileService';

const ProfileEdit = ({ match }) => {
  const [profile, setProfile] = useState({
    avatar: '',
    bio: '',
    favoriteBooks: '',
    favoriteGenres: ''
  });

  const history = useHistory();

  useEffect(() => {
    const fetchProfile = async () => {
      const fetchedProfile = await profileService.getProfile(match.params.id);
      setProfile(fetchedProfile);
    };
    fetchProfile();
  }, [match.params.id]);

  const handleChange = (event) => {
    setProfile({
      ...profile,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await profileService.updateProfile(match.params.id, profile);
    history.push(`/profile/${match.params.id}`);
  };

  return (
    <div className="profile-edit">
      <form onSubmit={handleSubmit}>
        <label>
          Avatar:
          <input
            type="text"
            name="avatar"
            value={profile.avatar}
            onChange={handleChange}
          />
        </label>
        <label>
          Bio:
          <textarea
            name="bio"
            value={profile.bio}
            onChange={handleChange}
          />
        </label>
        <label>
          Favorite Books:
          <input
            type="text"
            name="favoriteBooks"
            value={profile.favoriteBooks}
            onChange={handleChange}
          />
        </label>
        <label>
          Favorite Genres:
          <input
            type="text"
            name="favoriteGenres"
            value={profile.favoriteGenres}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default ProfileEdit;