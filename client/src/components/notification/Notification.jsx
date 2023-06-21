import {forwardRef} from "react";
import {Snackbar} from "@mui/material";
import MUIAlert from "@mui/material/Alert";
import {useSelector} from "react-redux";
import {
  selectNotification,
  selectNotificationOpen,
  selectNotificationError,
} from "../../slices/notificationSlice";

const Alert = forwardRef((props, ref) => {
  return <MUIAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Notification = () => {
  const notification = useSelector(selectNotification);
  const open = useSelector(selectNotificationOpen);
  const error = useSelector(selectNotificationError);

  if (notification) {
    return (
      <Snackbar open={open} anchorOrigin={{vertical: "bottom", horizontal: "right"}}>
        <Alert variant="outlined" severity={error} sx={{width: "100%", backgroundColor: "white"}}>
          {notification}
        </Alert>
      </Snackbar>
    );
  }
};

Alert.displayName = "Alert";

export default Notification;
