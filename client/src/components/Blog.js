import React, { Component } from 'react';
import blogService from '../services/blogService';

class Blog extends Component {
    state = {
        blogs: []
    };

    async componentDidMount() {
        const blogs = await blogService.getAllBlogs();
        this.setState({ blogs });
    }

    render() {
        return (
            <div className="blog-container">
                <h2>Blogs</h2>
                {this.state.blogs.map(blog => (
                    <div key={blog._id} className="blog-card">
                        <h3>{blog.title}</h3>
                        <p>{blog.content}</p>
                        <p>Written by: {blog.author}</p>
                        <p>Posted on: {new Date(blog.date).toLocaleDateString()}</p>
                    </div>
                ))}
            </div>
        );
    }
}

export default Blog;