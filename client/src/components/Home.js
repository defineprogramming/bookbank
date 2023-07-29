import React, { Component } from 'react';
import Navbar from './Navbar';
import bookService from '../services/bookService';
import recommendationService from '../services/recommendationService';

class Home extends Component {
    state = {
        books: [],
        recommendations: []
    }

    async componentDidMount() {
        const books = await bookService.getBooks();
        const recommendations = await recommendationService.getRecommendations();
        this.setState({ books, recommendations });
    }

    render() {
        const { books, recommendations } = this.state;

        return (
            <div>
                <Navbar />
                <div className="home">
                    <h1>Welcome to Book Club</h1>
                    <p>Share and discuss your favorite books with others.</p>
                    <div className="home-section">
                        <h2>Latest Books</h2>
                        <div className="book-list">
                            {books.map(book => (
                                <div key={book._id} className="book-item">
                                    <img src={book.coverImage} alt={book.title} />
                                    <h3>{book.title}</h3>
                                    <p>{book.author}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="home-section">
                        <h2>Recommendations for You</h2>
                        <div className="recommendation-list">
                            {recommendations.map(rec => (
                                <div key={rec._id} className="recommendation-item">
                                    <img src={rec.book.coverImage} alt={rec.book.title} />
                                    <h3>{rec.book.title}</h3>
                                    <p>{rec.book.author}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;