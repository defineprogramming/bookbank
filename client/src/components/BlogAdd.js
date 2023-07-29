import React, { useState } from 'react';
import blogService from '../services/blogService';

const BlogAdd = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const addBlog = async (event) => {
    event.preventDefault();
    try {
      const blogData = {
        title,
        content,
      };
      await blogService.create(blogData);
      setTitle('');
      setContent('');
    } catch (exception) {
      setErrorMessage('Something went wrong...');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  return (
    <div>
      <h2>Add a new blog post</h2>
      {errorMessage && <div className="error">{errorMessage}</div>}
      <form onSubmit={addBlog}>
        <div>
          Title:
          <input
            type="text"
            value={title}
            name="Title"
            onChange={handleTitleChange}
          />
        </div>
        <div>
          Content:
          <textarea
            value={content}
            name="Content"
            onChange={handleContentChange}
          />
        </div>
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default BlogAdd;