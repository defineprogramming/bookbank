import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export function getRecommendations(userId) {
    return axios.get(`${API_URL}/recommendations/${userId}`);
}

export function addRecommendation(userId, bookId) {
    return axios.post(`${API_URL}/recommendations`, { userId, bookId });
}

export function deleteRecommendation(recommendationId) {
    return axios.delete(`${API_URL}/recommendations/${recommendationId}`);
}

export function updateRecommendation(recommendationId, bookId) {
    return axios.put(`${API_URL}/recommendations/${recommendationId}`, { bookId });
}