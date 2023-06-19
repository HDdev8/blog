import {configureStore} from "@reduxjs/toolkit";
import {setupListeners} from "@reduxjs/toolkit/query";
import {apiSlice} from "../slices/apiSlice";
import filterReducer from "../common/components/filter/filterSlice";
import notificationReducer from "../common/components/notifications/notificationSlice";
import userReducer from "../slices/userSlice";

const store = configureStore({
  reducer: {
    filter: filterReducer,
    notifications: notificationReducer,
    users: userReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;

setupListeners(store.dispatch);
