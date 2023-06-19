import {createSlice} from "@reduxjs/toolkit";

const initialState = "ALL";

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    filter(state, action) {
      return action.payload;
    },
  },
});

export const {filter} = filterSlice.actions;

export const filterPost = (dispatch, text) => {
  dispatch(filter(text));
};

export const selectFilter = (state) => state.filter;

export default filterSlice.reducer;
