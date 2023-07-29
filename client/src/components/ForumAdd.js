import React, { useState } from 'react';
import forumService from '../services/forumService';

const ForumAdd = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [genre, setGenre] = useState('');
    const [message, setMessage] = useState(null);

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const handleGenreChange = (event) => {
        setGenre(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const forumData = {
                title,
                description,
                genre
            };
            await forumService.create(forumData);
            setTitle('');
            setDescription('');
            setGenre('');
            setMessage('Forum created successfully!');
        } catch (exception) {
            setMessage('Error creating forum');
        }
        setTimeout(() => {
            setMessage(null);
        }, 5000);
    };

    return (
        <div>
            <h2>Create a new forum</h2>
            {message && <p>{message}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input type="text" value={title} onChange={handleTitleChange} required />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea value={description} onChange={handleDescriptionChange} required />
                </div>
                <div>
                    <label>Genre:</label>
                    <input type="text" value={genre} onChange={handleGenreChange} required />
                </div>
                <button type="submit">Create</button>
            </form>
        </div>
    );
};

export default ForumAdd;