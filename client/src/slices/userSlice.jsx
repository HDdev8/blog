import {createSlice, createSelector} from "@reduxjs/toolkit";
import loginService from "../services/login";
import postService from "../services/posts";
import userService from "../services/users";

const initialState = {
  allUsers: [],
  currentUser: {username: null, name: null, token: null},
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
    setCredentials(state, {payload: {username, name, token}}) {
      state.currentUser.username = username;
      state.currentUser.name = name;
      state.currentUser.token = token;
    },
  },
});

export const {getUsers, addUser, setUser, removeUser, setCredentials} = userSlice.actions;

export const getAllUsers = async (dispatch) => {
  const users = await userService.getUsers();
  await dispatch(getUsers(users));
};

export const getUser = async (dispatch, userObject) => {
  const user = await userService.getUser(userObject);
  return user;
};

export const signIn = async (dispatch, userObject) => {
  const user = await loginService.login(userObject);
  await postService.setToken(user.token);
  window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
  await dispatch(setUser(user));
};

export const signOut = async (dispatch) => {
  // await postService.setToken(null);
  // window.localStorage.removeItem("loggedBlogappUser");
  await dispatch(removeUser());
};

export const retrieveUser = async (dispatch, userObject) => {
  await postService.setToken(userObject.token);
  await dispatch(setUser(userObject));
};

export default userSlice.reducer;

export const selectCurrentUser = (state) => state.users.currentUser;
export const selectCurrentUserToken = (state) => state.users.currentUser.token;

export const selectAllUsers = (state) => state.users.allUsers;
// export const selectCurrentUser0 = createSelector([selectUsers], (users) => users.currentUser);
