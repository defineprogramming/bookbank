import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export function getChallenges() {
    return axios.get(`${API_URL}/challenges`);
}

export function getChallengeById(id) {
    return axios.get(`${API_URL}/challenges/${id}`);
}

export function createChallenge(challengeData) {
    return axios.post(`${API_URL}/challenges`, challengeData);
}

export function updateChallenge(id, challengeData) {
    return axios.put(`${API_URL}/challenges/${id}`, challengeData);
}

export function deleteChallenge(id) {
    return axios.delete(`${API_URL}/challenges/${id}`);
}

export function joinChallenge(id) {
    return axios.post(`${API_URL}/challenges/${id}/join`);
}

export function leaveChallenge(id) {
    return axios.post(`${API_URL}/challenges/${id}/leave`);
}

export function completeChallenge(id) {
    return axios.post(`${API_URL}/challenges/${id}/complete`);
}