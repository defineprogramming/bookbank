import React, { useState } from 'react';
import authorService from '../services/authorService';

const AuthorAdd = () => {
    const [author, setAuthor] = useState({
        name: '',
        bio: '',
        bibliography: ''
    });

    const handleChange = (event) => {
        setAuthor({
            ...author,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await authorService.addAuthor(author);
            setAuthor({
                name: '',
                bio: '',
                bibliography: ''
            });
            alert('Author added successfully!');
        } catch (error) {
            console.error('Failed to add author', error);
        }
    };

    return (
        <div>
            <h2>Add Author</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input type="text" name="name" value={author.name} onChange={handleChange} required />
                </label>
                <label>
                    Bio:
                    <textarea name="bio" value={author.bio} onChange={handleChange} required />
                </label>
                <label>
                    Bibliography:
                    <textarea name="bibliography" value={author.bibliography} onChange={handleChange} required />
                </label>
                <button type="submit">Add Author</button>
            </form>
        </div>
    );
};

export default AuthorAdd;