```javascript
import React, { useState } from 'react';
import bookService from '../services/bookService';

const BookAdd = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [coverImage, setCoverImage] = useState('');
    const [description, setDescription] = useState('');
    const [genres, setGenres] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const bookData = {
            title,
            author,
            coverImage,
            description,
            genres
        };
        try {
            await bookService.addBook(bookData);
            setTitle('');
            setAuthor('');
            setCoverImage('');
            setDescription('');
            setGenres('');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="book-add">
            <form onSubmit={handleSubmit}>
                <label>Title:</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                <label>Author:</label>
                <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} required />
                <label>Cover Image URL:</label>
                <input type="text" value={coverImage} onChange={(e) => setCoverImage(e.target.value)} required />
                <label>Description:</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
                <label>Genres:</label>
                <input type="text" value={genres} onChange={(e) => setGenres(e.target.value)} required />
                <button type="submit">Add Book</button>
            </form>
        </div>
    );
};

export default BookAdd;
```