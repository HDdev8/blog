import {Box, Typography, Button} from "@mui/material";
import HdIcon from "@mui/icons-material/Hd";
import {Link} from "react-router-dom";

const pages = [
  {title: "Posts", url: "/"},
  {title: "Users", url: "/api/users"},
];

const NavMenuFull = ({handleClose}) => {
  return (
    <>
      <HdIcon sx={{display: {xs: "flex", md: "none"}, mr: 1}} />
      <Typography
        variant="h5"
        noWrap
        sx={{
          mr: 2,
          display: {xs: "flex", md: "none"},
          flexGrow: 1,
          fontFamily: "monospace",
          fontWeight: 700,
          letterSpacing: ".3rem",
          color: "inherit",
          textDecoration: "none",
        }}>
        BLOG
      </Typography>
      <Box sx={{flexGrow: 1, display: {xs: "none", md: "flex"}}}>
        {pages.map((page) => (
          <Button
            key={page.title}
            onClick={handleClose}
            sx={{my: 2, color: "inherent", display: "block"}}
            component={Link}
            to={page.url}>
            {page.title}
          </Button>
        ))}
      </Box>
    </>
  );
};

export default NavMenuFull;
