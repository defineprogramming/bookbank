import React, { Component } from 'react';
import blogService from '../services/blogService';

class BlogView extends Component {
    state = {
        blog: null,
    };

    async componentDidMount() {
        const blogId = this.props.match.params.id;
        const blog = await blogService.getBlog(blogId);
        this.setState({ blog });
    }

    render() {
        const { blog } = this.state;

        if (!blog) return <div>Loading...</div>;

        return (
            <div className="blog-view">
                <h2>{blog.title}</h2>
                <p>{blog.content}</p>
                <div className="blog-author">
                    <p>Written by: {blog.author.username}</p>
                    <img src={blog.author.avatar} alt={blog.author.username} />
                </div>
                <div className="blog-comments">
                    {blog.comments.map((comment, index) => (
                        <div key={index} className="comment">
                            <p>{comment.text}</p>
                            <p>Commented by: {comment.user.username}</p>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default BlogView;