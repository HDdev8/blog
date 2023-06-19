import {forwardRef} from "react";
import {Snackbar} from "@mui/material";
import MUIAlert from "@mui/material/Alert";
import {useSelector} from "react-redux";
import {selectNotifications} from "./notificationSlice";

const Alert = forwardRef((props, ref) => {
  return <MUIAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Notification = () => {
  const notifications = useSelector(selectNotifications);
  const {open, error, notification} = notifications;

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
