```javascript
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export function getProfile(userId) {
    return axios.get(`${API_URL}/profiles/${userId}`);
}

export function createProfile(profileData) {
    return axios.post(`${API_URL}/profiles`, profileData);
}

export function updateProfile(userId, profileData) {
    return axios.put(`${API_URL}/profiles/${userId}`, profileData);
}

export function deleteProfile(userId) {
    return axios.delete(`${API_URL}/profiles/${userId}`);
}

export function addBookToProfile(userId, bookId) {
    return axios.post(`${API_URL}/profiles/${userId}/books`, { bookId });
}

export function removeBookFromProfile(userId, bookId) {
    return axios.delete(`${API_URL}/profiles/${userId}/books/${bookId}`);
}

export function getProfileBooks(userId) {
    return axios.get(`${API_URL}/profiles/${userId}/books`);
}

export function followUser(userId, followId) {
    return axios.post(`${API_URL}/profiles/${userId}/follow`, { followId });
}

export function unfollowUser(userId, followId) {
    return axios.delete(`${API_URL}/profiles/${userId}/follow/${followId}`);
}

export function getFollowers(userId) {
    return axios.get(`${API_URL}/profiles/${userId}/followers`);
}

export function getFollowing(userId) {
    return axios.get(`${API_URL}/profiles/${userId}/following`);
}
```