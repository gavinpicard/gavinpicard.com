// API Configuration
// Use environment variable in production, fallback to localhost for development
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

export const API_ENDPOINTS = {
  POSTS: `${API_BASE_URL}/posts`,
  POST_BY_ID: (id) => `${API_BASE_URL}/posts/${id}`,
  UPDATE_POST: (id) => `${API_BASE_URL}/posts/${id}`,
  DELETE_POST: (id) => `${API_BASE_URL}/posts/${id}`,
  UPLOADS: `${API_BASE_URL}/uploads`,
};

// Helper function to get image URL from cover_path
// cover_path is stored as "uploads/filename" in database
export const getImageUrl = (coverPath) => {
  if (!coverPath) return '';
  // Remove "uploads/" prefix if present, then construct full URL
  const filename = coverPath.replace(/^uploads\//, '');
  return `${API_ENDPOINTS.UPLOADS}/${filename}`;
};

export default API_BASE_URL;

