```javascript
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export function followUser(userId) {
    return axios.post(`${API_URL}/social/follow`, { userId });
}

export function unfollowUser(userId) {
    return axios.post(`${API_URL}/social/unfollow`, { userId });
}

export function getFollowers(userId) {
    return axios.get(`${API_URL}/social/followers/${userId}`);
}

export function getFollowing(userId) {
    return axios.get(`${API_URL}/social/following/${userId}`);
}

export function likePost(postId) {
    return axios.post(`${API_URL}/social/like`, { postId });
}

export function unlikePost(postId) {
    return axios.post(`${API_URL}/social/unlike`, { postId });
}

export function getLikes(postId) {
    return axios.get(`${API_URL}/social/likes/${postId}`);
}

export function commentOnPost(postId, comment) {
    return axios.post(`${API_URL}/social/comment`, { postId, comment });
}

export function deleteComment(postId, commentId) {
    return axios.delete(`${API_URL}/social/comment/${postId}/${commentId}`);
}

export function getComments(postId) {
    return axios.get(`${API_URL}/social/comments/${postId}`);
}

export function shareBook(bookId) {
    return axios.post(`${API_URL}/social/share`, { bookId });
}
```