import {useState} from "react";
import {AppBar as Bar, Toolbar, Container} from "@mui/material";
import NavMenuMobile from "./navMenus/NavMenuMobile";
import NavMenuFull from "./navMenus/NavMenuFull";
import UserMenu from "./userMenus/UserMenu";

const NavBar = () => {
  const [anchorElement, setAnchorElement] = useState(null);

  const handleOpen = (e) => {
    setAnchorElement(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorElement(null);
  };

  return (
    <Bar position="static" color="inherit" variant="string" sx={{square: false}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <NavMenuMobile handleOpen={handleOpen} handleClose={handleClose} anchor={anchorElement} />
          <NavMenuFull handleClose={handleClose} />
          <UserMenu />
        </Toolbar>
      </Container>
    </Bar>
  );
};

export default NavBar;
