import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import authorService from '../services/authorService';

class AuthorView extends Component {
    state = {
        author: null,
    };

    async componentDidMount() {
        const { id } = this.props.match.params;
        const author = await authorService.getAuthor(id);
        this.setState({ author });
    }

    render() {
        const { author } = this.state;

        if (!author) return <div>Loading...</div>;

        return (
            <div className="author-view">
                <h2>{author.name}</h2>
                <img src={author.avatar} alt={author.name} />
                <p>{author.bio}</p>
                <h3>Bibliography:</h3>
                <ul>
                    {author.books.map((book) => (
                        <li key={book._id}>
                            <Link to={`/books/${book._id}`}>{book.title}</Link>
                        </li>
                    ))}
                </ul>
                <Link to="/authors">Back to authors</Link>
            </div>
        );
    }
}

export default AuthorView;