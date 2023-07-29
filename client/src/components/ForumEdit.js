import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import forumService from '../services/forumService';

const ForumEdit = () => {
  const [forum, setForum] = useState({ title: '', content: '' });
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    const fetchForum = async () => {
      const result = await forumService.getForum(id);
      setForum(result);
    };
    fetchForum();
  }, [id]);

  const handleInputChange = (event) => {
    setForum({ ...forum, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await forumService.updateForum(id, forum);
      history.push(`/forums/${id}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Edit Forum</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={forum.title}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Content:
          <textarea
            name="content"
            value={forum.content}
            onChange={handleInputChange}
            required
          />
        </label>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default ForumEdit;