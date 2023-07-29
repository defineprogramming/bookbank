```javascript
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export function register(user) {
    return axios.post(`${API_URL}/auth/register`, user);
}

export function login(credentials) {
    return axios.post(`${API_URL}/auth/login`, credentials);
}

export function logout() {
    return axios.post(`${API_URL}/auth/logout`);
}

export function getCurrentUser() {
    return axios.get(`${API_URL}/auth/me`);
}

export function updateProfile(user) {
    return axios.put(`${API_URL}/auth/me`, user);
}

export function changePassword(data) {
    return axios.put(`${API_URL}/auth/change-password`, data);
}
```