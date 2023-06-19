import {Typography, MenuItem, ListItemIcon} from "@mui/material";
import {useSelector, useDispatch} from "react-redux";
import LogoutIcon from "@mui/icons-material/Logout";
import {successNotification} from "../../../notifications/notificationSlice";
import {selectCurrentUser, signOut} from "../../../../../slices/userSlice";
// import {useSetTokenMutation} from "../../../../../slices/apiSlice";

const signedInSettings = [{title: "Sign out", icon: <LogoutIcon fontSize="small" />}];

const SignedIn = ({handleClose}) => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);

  // const [setNewToken] = useSetTokenMutation();
  /* I think I still dispatch something to set the current User, because I think once the user.token is made null on the server, removing the user (like from the avatar) happens on the client */
  /* But what about the signedIn user? How does the user appear in the avatar? Oh, I think the user is Selected but then doesn't update unless signOut is dispatched. */
  const logOut = async (e) => {
    e.preventDefault();
    // await setNewToken(null);
    window.localStorage.removeItem("loggedBlogappUser");
    await signOut(dispatch);
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
