import axios from "axios";

const API_URL = "http://localhost:4000";

export const fetchPosts = async () => {
  const { data } = await axios.get(`${API_URL}/posts`);
  return data;
};

export const fetchPost = async (id) => {
  const { data } = await axios.get(`${API_URL}/posts/${id}`);
  return data;
};

export const addComment = async ({ postId, author, text }) => {
  const { data } = await axios.post(`${API_URL}/posts/${postId}/comments`, { author, text });
  return data;
};
