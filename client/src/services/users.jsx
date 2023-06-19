import axios from "axios";
// const baseUrl = "/api/users";
const baseUrl = "http://localhost:3001/api/users";

const getUsers = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const getUser = async (userObject) => {
  const {id} = userObject;
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
};

const addUser = async (credentials) => {
  const response = await axios.post(baseUrl, credentials);
  return response.data;
};

export default {getUsers, getUser, addUser};
