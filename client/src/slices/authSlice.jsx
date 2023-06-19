import {createSlice, createSelector} from "@reduxjs/toolkit";
import loginService from "../services/login";
import postService from "../services/posts";
import userService from "../services/users";

// const initialState = {
//   allUsers: [],
//   currentUser: {username: null, name: null, token: null},
// };

const initialState = {
  loading: false,
  userInfo: {}, // for user object
  userToken: null, // for storing the JWT
  error: null,
  success: false, // for monitoring the registration process.
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    getUsers(state, action) {
      return {...state, allUsers: action.payload};
    },
    setUser(state, action) {
      const {username, name, token} = action.payload;
      return {...state, currentUser: {username, name, token}};
    },
    addUser(state, action) {
      return {...state, allUsers: state.allUsers.concat(action.payload)};
    },
    removeUser(state) {
      return {...state, currentUser: {username: null, name: null, token: null}};
    },
  },
});

export const selectToken = (state) => state.currentUser.token;

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: {},
});

export default authSlice.reducer;
