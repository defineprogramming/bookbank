import React, { Component } from 'react';
import bookService from '../services/bookService';

class Bookshelf extends Component {
    state = {
        books: []
    };

    async componentDidMount() {
        const { data: books } = await bookService.getBooks();
        this.setState({ books });
    }

    render() {
        return (
            <div className="bookshelf">
                <h2>Your Bookshelf</h2>
                {this.state.books.length === 0 && <p>No books in your bookshelf yet.</p>}
                <div className="bookshelf-books">
                    {this.state.books.map(book => (
                        <div key={book._id} className="book">
                            <img src={book.coverImage} alt={book.title} />
                            <h3>{book.title}</h3>
                            <p>{book.author}</p>
                            <p>{book.description}</p>
                            <button onClick={() => this.handleRemove(book._id)}>Remove from Bookshelf</button>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    handleRemove = async (id) => {
        await bookService.removeBook(id);
        const books = this.state.books.filter(book => book._id !== id);
        this.setState({ books });
    };
}

export default Bookshelf;