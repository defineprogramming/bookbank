import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import authorService from '../services/authorService';

class Author extends Component {
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

        if (!author) {
            return <div>Loading...</div>;
        }

        return (
            <div className="author-page">
                <h2>{author.name}</h2>
                <img src={author.avatar} alt={author.name} />
                <p>{author.bio}</p>
                <h3>Bibliography:</h3>
                <ul>
                    {author.books.map(book => (
                        <li key={book._id}>
                            <Link to={`/book/${book._id}`}>{book.title}</Link>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default Author;