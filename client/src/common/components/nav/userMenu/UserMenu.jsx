import {useState} from "react";
import {Box, IconButton, Menu, Avatar, Tooltip} from "@mui/material";
import AvatarLetterBackground from "./avatars/AvatarLetterBackground";
import {selectCurrentUser} from "../../../../slices/userSlice";
import {useSelector} from "react-redux";
import SignedIn from "./signedIn/SignedIn";
import SignedOut from "./signedOut/SignedOut";

const UserMenu = () => {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const currentUser = useSelector(selectCurrentUser);

  const handleOpenUserMenu = (e) => {
    setAnchorElUser(e.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Box sx={{flexGrow: 0}}>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
          {(!currentUser.username && <Avatar />) || (currentUser.username && <AvatarLetterBackground />)}
        </IconButton>
      </Tooltip>
      <Menu
        sx={{mt: "45px"}}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}>
        {(!currentUser.username && <SignedOut handleClose={handleCloseUserMenu} />) ||
          (currentUser.username && <SignedIn handleClose={handleCloseUserMenu} />)}
      </Menu>
    </Box>
  );
};

export default UserMenu;
