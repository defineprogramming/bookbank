import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import authorService from '../services/authorService';

const AuthorEdit = () => {
  const [author, setAuthor] = useState({
    name: '',
    bio: '',
    bibliography: ''
  });

  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    loadAuthor();
  }, []);

  const loadAuthor = async () => {
    const res = await authorService.getAuthor(id);
    setAuthor(res.data);
  };

  const onInputChange = e => {
    setAuthor({ ...author, [e.target.name]: e.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault();
    await authorService.updateAuthor(id, author);
    history.push(`/authors/${id}`);
  };

  return (
    <div className="container">
      <div className="w-75 mx-auto shadow p-5">
        <h2 className="text-center mb-4">Edit Author</h2>
        <form onSubmit={e => onSubmit(e)}>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Author Name"
              name="name"
              value={author.name}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <textarea
              className="form-control form-control-lg"
              placeholder="Enter Author Bio"
              name="bio"
              value={author.bio}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <textarea
              className="form-control form-control-lg"
              placeholder="Enter Bibliography"
              name="bibliography"
              value={author.bibliography}
              onChange={e => onInputChange(e)}
            />
          </div>
          <button className="btn btn-warning btn-block">Update Author</button>
        </form>
      </div>
    </div>
  );
};

export default AuthorEdit;