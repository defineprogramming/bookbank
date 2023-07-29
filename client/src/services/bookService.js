```javascript
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export function getBooks() {
    return axios.get(`${API_URL}/books`);
}

export function getBookById(id) {
    return axios.get(`${API_URL}/books/${id}`);
}

export function addBook(book) {
    return axios.post(`${API_URL}/books`, book);
}

export function updateBook(id, book) {
    return axios.put(`${API_URL}/books/${id}`, book);
}

export function deleteBook(id) {
    return axios.delete(`${API_URL}/books/${id}`);
}

export function searchBooks(query) {
    return axios.get(`${API_URL}/books/search?query=${query}`);
}

export function addBookToShelf(userId, bookId) {
    return axios.post(`${API_URL}/users/${userId}/shelf`, { bookId });
}

export function removeBookFromShelf(userId, bookId) {
    return axios.delete(`${API_URL}/users/${userId}/shelf/${bookId}`);
}
```