import {configureStore} from "@reduxjs/toolkit";
import {setupListeners} from "@reduxjs/toolkit/query";
import {apiSlice} from "../slices/apiSlice";
import filterReducer from "../slices/filterSlice";
import notificationReducer from "../slices/notificationSlice";
import userReducer from "../slices/userSlice";

const store = configureStore({
  reducer: {
    filter: filterReducer,
    notifications: notificationReducer,
    user: userReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;

setupListeners(store.dispatch);
