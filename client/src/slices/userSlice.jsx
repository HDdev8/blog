import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  currentUser: {username: null, name: null, token: null},
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCurrentUser(state, action) {
      const {username, name, token} = action.payload;
      return {...state, currentUser: {username, name, token}};
    },
    removeUser(state) {
      return {...state, currentUser: {username: null, name: null, token: null}};
    },
  },
});

export const {setCurrentUser, removeUser} = userSlice.actions;
export default userSlice.reducer;

export const setUserState = (dispatch, userObject) => {
  dispatch(setCurrentUser(userObject));
  window.localStorage.setItem("loggedBlogappUser", JSON.stringify(userObject));
};

export const clearUserState = (dispatch) => {
  dispatch(removeUser());
  window.localStorage.removeItem("loggedBlogappUser");
};

export const setLocalUser = (dispatch, userObject) => {
  dispatch(setCurrentUser(userObject));
};

export const selectCurrentUser = (state) => state.user.currentUser;
export const selectCurrentUserToken = (state) => state.user.currentUser.token;
