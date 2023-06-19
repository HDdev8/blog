import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {startListening} from "./listenerMiddlewares";

const initialState = {open: false, error: null, notification: null};

const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    notify(state, action) {
      return {...state, open: true, error: "success", notification: action.payload};
    },
    errorNotify(state, action) {
      return {...state, open: true, error: "error", notification: action.payload};
    },
    clear(state, action) {
      return {...state, open: false, error: null, notification: action.payload};
    },
  },
});

export const successNotification = async (dispatch, message) => {
  await dispatch(notify(message));
  await setTimeout(() => dispatch(clear()), 5000);
};
export const errorNotification = async (dispatch, error) => {
  await dispatch(errorNotify(`${error}`));
  await setTimeout(() => dispatch(clear()), 5000);
};

startListening({
  actionCreator: notify,
  effect: async (action, listenerApi) => {
    await listenerApi.delay(1000);
    listenerApi.dispatch(notify());
  },
});

export const {notify, clear, errorNotify} = notificationSlice.actions;
export default notificationSlice.reducer;

/* Store */
// import {configureStore} from "@reduxjs/toolkit";
// import {listenerMiddleware} from "./listenerMiddleware";
/* export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(listenerMiddleware.middleware),
}); */

const showNotification = createAsyncThunk("notify", async (message) => {
  const user = await userApi.getUserById(userId);
  return user;
});

const fetchUserById = (userId) => {
  return async (dispatch, getState) => {
    dispatch(fetchUserStarted());
    let lastAction;
    try {
      const user = await userApi.getUserById(userId);
      lastAction = fetchUserSucceeded(user);
    } catch (err) {
      lastAction = fetchUserFailed(err.message);
    }
    dispatch(lastAction);
  };
};

const showSuccess = async (message) => {
  return async (dispatch, getState) => {
    await dispatch(notify(message));
    await setTimeout(() => dispatch(clear()), 5000);
  };
};

// Similar request with `createAsyncThunk`
export const showNot = createAsyncThunk("fetchUserById", async (dispatch, message) => {
  await dispatch(notify(message));
  await setTimeout(() => dispatch(clear()), 5000);
});
