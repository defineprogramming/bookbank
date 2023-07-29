import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import bookService from '../services/bookService';

class BookView extends Component {
    state = {
        book: {
            title: '',
            author: '',
            coverImage: '',
            description: '',
            genres: [],
        },
        loading: true,
    };

    async componentDidMount() {
        const { id } = this.props.match.params;
        const book = await bookService.getBook(id);
        this.setState({ book, loading: false });
    }

    render() {
        const { book, loading } = this.state;

        if (loading) {
            return <div>Loading...</div>;
        }

        return (
            <div className="book-view">
                <img src={book.coverImage} alt={book.title} />
                <h2>{book.title}</h2>
                <h3>by {book.author}</h3>
                <p>{book.description}</p>
                <div>
                    Genres: {book.genres.join(', ')}
                </div>
                <Link to={`/books/edit/${book._id}`}>Edit</Link>
                <Link to="/books">Back to Books</Link>
            </div>
        );
    }
}

export default BookView;