```javascript
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export function getReviews() {
    return axios.get(`${API_URL}/reviews`);
}

export function getReviewById(id) {
    return axios.get(`${API_URL}/reviews/${id}`);
}

export function createReview(reviewData) {
    return axios.post(`${API_URL}/reviews`, reviewData);
}

export function updateReview(id, updatedData) {
    return axios.put(`${API_URL}/reviews/${id}`, updatedData);
}

export function deleteReview(id) {
    return axios.delete(`${API_URL}/reviews/${id}`);
}
```