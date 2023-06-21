import {createSlice} from "@reduxjs/toolkit";

const initialState = {open: false, error: null, notification: null};

const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    notifySuccess(state, action) {
      return {...state, open: true, error: "success", notification: action.payload};
    },
    notifyError(state, action) {
      return {...state, open: true, error: "error", notification: action.payload};
    },
    clear(state, action) {
      return {...state, open: false, error: null, notification: action.payload};
    },
  },
});

export const {notifySuccess, notifyError, clear} = notificationSlice.actions;

export default notificationSlice.reducer;

export const successNotification = async (dispatch, message) => {
  await dispatch(notifySuccess(message));
  await setTimeout(() => dispatch(clear()), 5000);
};

export const errorNotification = async (dispatch, error) => {
  await dispatch(notifyError(`${error}`));
  await setTimeout(() => dispatch(clear()), 5000);
};

export const selectNotification = (state) => state.notifications.notification;
export const selectNotificationOpen = (state) => state.notifications.open;
export const selectNotificationError = (state) => state.notifications.error;
