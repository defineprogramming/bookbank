import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import bookService from '../services/bookService';

class Book extends Component {
    state = {
        book: null,
    };

    async componentDidMount() {
        const { id } = this.props.match.params;
        const book = await bookService.getBook(id);
        this.setState({ book });
    }

    render() {
        const { book } = this.state;
        if (!book) return <div>Loading...</div>;

        return (
            <div className="book">
                <img src={book.coverImage} alt={book.title} />
                <h2>{book.title}</h2>
                <h3>by {book.author}</h3>
                <p>{book.description}</p>
                <div className="genres">
                    {book.genres.map((genre, index) => (
                        <span key={index} className="genre">{genre}</span>
                    ))}
                </div>
                <Link to={`/book/edit/${book._id}`}>Edit</Link>
                <Link to={`/book/delete/${book._id}`}>Delete</Link>
            </div>
        );
    }
}

export default Book;