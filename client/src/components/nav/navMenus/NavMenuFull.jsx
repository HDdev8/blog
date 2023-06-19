import {Box, IconButton, Typography, Menu, MenuItem} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HdIcon from "@mui/icons-material/Hd";
import {Link} from "react-router-dom";

const pages = [
  {title: "Posts", url: "/"},
  {title: "Users", url: "/api/users"},
];

const NavMenuFull = ({handleOpen, handleClose, anchor}) => {
  return (
    <>
      <HdIcon sx={{display: {xs: "none", md: "flex"}, mr: 1}} />
      <Typography
        variant="h6"
        noWrap
        sx={{
          mr: 2,
          display: {xs: "none", md: "flex"},
          fontFamily: "monospace",
          fontWeight: 700,
          letterSpacing: ".3rem",
          color: "inherit",
          textDecoration: "none",
        }}>
        BLOG
      </Typography>
      <Box sx={{flexGrow: 1, display: {xs: "flex", md: "none"}}}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleOpen}
          color="inherit">
          <MenuIcon />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchor}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          open={Boolean(anchor)}
          onClose={handleClose}
          sx={{
            display: {xs: "block", md: "none"},
          }}>
          {pages.map((page) => (
            <MenuItem key={page.title} onClick={handleClose}>
              <Typography textAlign="center" component={Link} to={page.url}>
                {page.title}
              </Typography>
            </MenuItem>
          ))}
        </Menu>
      </Box>
    </>
  );
};

export default NavMenuFull;
