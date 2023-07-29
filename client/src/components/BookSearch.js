import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import bookService from '../services/bookService';

const BookSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const history = useHistory();

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    try {
      const results = await bookService.searchBooks(searchTerm);
      history.push({
        pathname: '/search-results',
        state: { results },
      });
    } catch (error) {
      console.error('Failed to fetch books:', error);
    }
  };

  return (
    <div className="book-search">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search for a book..."
          value={searchTerm}
          onChange={handleInputChange}
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default BookSearch;