import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export function getAuthors() {
    return axios.get(`${API_URL}/authors`);
}

export function getAuthorById(id) {
    return axios.get(`${API_URL}/authors/${id}`);
}

export function createAuthor(authorData) {
    return axios.post(`${API_URL}/authors`, authorData);
}

export function updateAuthor(id, updatedData) {
    return axios.put(`${API_URL}/authors/${id}`, updatedData);
}

export function deleteAuthor(id) {
    return axios.delete(`${API_URL}/authors/${id}`);
}