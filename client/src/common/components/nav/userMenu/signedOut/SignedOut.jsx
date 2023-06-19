import {Typography, MenuItem, ListItemIcon} from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import {Link} from "react-router-dom";

const signedOutSettings = [
  {title: "Sign in", icon: <LoginIcon fontSize="small" />, url: "/api/login"},
  {title: "Sign up", icon: <PersonAddIcon fontSize="small" />, url: "/signup"},
];

const SignedOut = ({handleClose}) => {
  return signedOutSettings.map((setting) => (
    <MenuItem key={setting.title} onClick={handleClose} component={Link} to={setting.url}>
      <ListItemIcon>{setting.icon}</ListItemIcon>
      <Typography textAlign="center">{setting.title}</Typography>
    </MenuItem>
  ));
};

export default SignedOut;
