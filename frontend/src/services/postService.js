import api from './api';

export const fetchPosts = (params = {}) => api.get('/posts', { params });
export const fetchPost = (id) => api.get(`/posts/${id}`);
export const createPost = (payload) => api.post('/posts', payload, {
  headers: { 'Content-Type': 'multipart/form-data' }
});
export const updatePost = (id, payload) => api.put(`/posts/${id}`, payload, {
  headers: { 'Content-Type': 'multipart/form-data' }
});
export const removePost = (id) => api.delete(`/posts/${id}`);
