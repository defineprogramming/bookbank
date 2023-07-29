import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import socialService from '../services/socialService';

const Social = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await socialService.getAllUsers();
      setUsers(response.data);
    };
    fetchUsers();
  }, []);

  return (
    <div className="social-page">
      <h2>Connect with other book lovers</h2>
      <div className="user-list">
        {users.map((user) => (
          <div key={user._id} className="user-card">
            <img src={user.avatar} alt="User avatar" />
            <h3><Link to={`/profile/${user._id}`}>{user.username}</Link></h3>
            <p>{user.bio}</p>
            <button onClick={() => socialService.followUser(user._id)}>Follow</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Social;