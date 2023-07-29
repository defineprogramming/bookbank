import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import blogService from '../services/blogService';

const BlogEdit = () => {
  const [blog, setBlog] = useState({ title: '', content: '' });
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    const fetchBlog = async () => {
      const result = await blogService.getBlog(id);
      setBlog(result.data);
    };
    fetchBlog();
  }, [id]);

  const handleInputChange = (event) => {
    setBlog({ ...blog, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await blogService.updateBlog(id, blog);
    history.push(`/blogs/${id}`);
  };

  return (
    <div>
      <h2>Edit Blog</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={blog.title}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Content:
          <textarea
            name="content"
            value={blog.content}
            onChange={handleInputChange}
            required
          />
        </label>
        <button type="submit">Update Blog</button>
      </form>
    </div>
  );
};

export default BlogEdit;