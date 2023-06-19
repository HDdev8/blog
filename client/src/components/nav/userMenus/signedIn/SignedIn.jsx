import {Typography, MenuItem, ListItemIcon} from "@mui/material";
import {useSelector, useDispatch} from "react-redux";
import LogoutIcon from "@mui/icons-material/Logout";
import {successNotification} from "../../../../slices/notificationSlice";
import {selectCurrentUser, clearUserState} from "../../../../slices/userSlice";

const signedInSettings = [{title: "Sign out", icon: <LogoutIcon fontSize="small" />}];

const SignedIn = ({handleClose}) => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);

  const logOut = async (e) => {
    e.preventDefault();
    clearUserState(dispatch);
    successNotification(dispatch, `${currentUser.username} has logged out`);
  };

  return signedInSettings.map((setting) => (
    <MenuItem key={setting.title} onClick={handleClose}>
      <ListItemIcon>{setting.icon}</ListItemIcon>
      <Typography textAlign="center" onClick={logOut}>
        {setting.title}
      </Typography>
    </MenuItem>
  ));
};

export default SignedIn;
