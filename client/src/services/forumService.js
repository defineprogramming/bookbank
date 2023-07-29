import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export function getForums() {
    return axios.get(`${API_URL}/forums`);
}

export function getForumById(id) {
    return axios.get(`${API_URL}/forums/${id}`);
}

export function createForum(forumData) {
    return axios.post(`${API_URL}/forums`, forumData);
}

export function updateForum(id, updatedData) {
    return axios.put(`${API_URL}/forums/${id}`, updatedData);
}

export function deleteForum(id) {
    return axios.delete(`${API_URL}/forums/${id}`);
}

export function getPostsInForum(forumId) {
    return axios.get(`${API_URL}/forums/${forumId}/posts`);
}

export function createPostInForum(forumId, postData) {
    return axios.post(`${API_URL}/forums/${forumId}/posts`, postData);
}

export function updatePostInForum(forumId, postId, updatedData) {
    return axios.put(`${API_URL}/forums/${forumId}/posts/${postId}`, updatedData);
}

export function deletePostInForum(forumId, postId) {
    return axios.delete(`${API_URL}/forums/${forumId}/posts/${postId}`);
}