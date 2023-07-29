import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import bookService from '../services/bookService';

const BookEdit = () => {
  const [book, setBook] = useState({
    title: '',
    author: '',
    coverImage: '',
    description: '',
    genres: [],
  });

  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    const fetchBook = async () => {
      const result = await bookService.getBook(id);
      setBook(result.data);
    };
    fetchBook();
  }, [id]);

  const handleInputChange = (event) => {
    setBook({
      ...book,
      [event.target.name]: event.target.value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    await bookService.updateBook(id, book);
    history.push(`/book/${id}`);
  };

  return (
    <div className="book-edit">
      <h2>Edit Book</h2>
      <form onSubmit={handleFormSubmit}>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={book.title}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Author:
          <input
            type="text"
            name="author"
            value={book.author}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Cover Image URL:
          <input
            type="text"
            name="coverImage"
            value={book.coverImage}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Description:
          <textarea
            name="description"
            value={book.description}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Genres:
          <input
            type="text"
            name="genres"
            value={book.genres.join(', ')}
            onChange={(event) =>
              setBook({
                ...book,
                genres: event.target.value.split(', ').map((genre) => genre.trim()),
              })
            }
          />
        </label>
        <button type="submit">Update Book</button>
      </form>
    </div>
  );
};

export default BookEdit;