import {useState} from "react";
import {Box, IconButton, Menu, Avatar, Tooltip} from "@mui/material";
import AvatarLetterBackground from "./avatars/AvatarLetterBackground";
import {selectCurrentUser} from "../../../slices/userSlice";
import {useSelector} from "react-redux";
import SignedIn from "./signedIn/SignedIn";
import SignedOut from "./signedOut/SignedOut";

const UserMenu = () => {
  const [anchorElement, setAnchorElement] = useState(null);
  const currentUser = useSelector(selectCurrentUser);

  const handleOpen = (e) => {
    setAnchorElement(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorElement(null);
  };

  return (
    <Box sx={{flexGrow: 0}} className="userMenu">
      <Tooltip title="Open settings" placement="left">
        <IconButton onClick={handleOpen} sx={{p: 0}}>
          {(!currentUser.username && <Avatar />) ||
            (currentUser.username && <AvatarLetterBackground />)}
        </IconButton>
      </Tooltip>
      <Menu
        sx={{mt: "45px"}}
        id="menu-appbar"
        anchorEl={anchorElement}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElement)}
        onClose={handleClose}>
        {(!currentUser.username && <SignedOut handleClose={handleClose} />) ||
          (currentUser.username && <SignedIn handleClose={handleClose} />)}
      </Menu>
    </Box>
  );
};

export default UserMenu;
