import axios from "axios";
// const baseUrl = "/api/posts";
const baseUrl = "http://localhost:3001/api/posts";

const fromTimestamp = (timestamp) => new Date(timestamp * 1000);
const currentTime = () => new Date();

// currentTime > expired === false?

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const parseJwt = (t) => {
  try {
    return JSON.parse(atob(t.split(".")[1]));
  } catch (e) {
    return null;
  }
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const getPost = async (postObject) => {
  const {id} = postObject;
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
};

const create = async (newObject) => {
  const config = {
    headers: {Authorization: token},
  };
  const response = await axios.post(baseUrl, newObject, config);
  console.log("postService create parseJwt", parseJwt(token));
  return response.data;
};

const update = async (postObject) => {
  const config = {
    headers: {Authorization: token},
  };
  const {id} = postObject;
  const response = await axios.put(`${baseUrl}/${id}`, postObject, config);
  console.log("postService update parseJwt", parseJwt(token));
  return response.data;
};

const deletePost = async (postObject) => {
  const config = {
    headers: {Authorization: token},
  };
  const {id} = postObject;
  const response = await axios.delete(`${baseUrl}/${id}`, config);
  return response.data;
};

export default {
  getAll,
  getPost,
  create,
  update,
  setToken,
  deletePost,
};
