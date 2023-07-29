import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export function getBlogs() {
    return axios.get(`${API_URL}/blogs`);
}

export function getBlogById(id) {
    return axios.get(`${API_URL}/blogs/${id}`);
}

export function createBlog(blogData) {
    return axios.post(`${API_URL}/blogs`, blogData);
}

export function updateBlog(id, blogData) {
    return axios.put(`${API_URL}/blogs/${id}`, blogData);
}

export function deleteBlog(id) {
    return axios.delete(`${API_URL}/blogs/${id}`);
}