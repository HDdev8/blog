import {useState} from "react";
import {AppBar as Bar, Toolbar, Container} from "@mui/material";
import NavMenuFull from "./navMenus/NavMenuFull";
import NavMenuMobile from "./navMenus/NavMenuMobile";
import UserMenu from "./userMenus/UserMenu";

const NavBar = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);

  const handleOpenNavMenu = (e) => {
    setAnchorElNav(e.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <Bar position="static" color="inherit" variant="string" sx={{square: false}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <NavMenuFull
            handleOpen={handleOpenNavMenu}
            handleClose={handleCloseNavMenu}
            anchor={anchorElNav}
          />
          <NavMenuMobile handleClose={handleCloseNavMenu} />
          <UserMenu />
        </Toolbar>
      </Container>
    </Bar>
  );
};

export default NavBar;
