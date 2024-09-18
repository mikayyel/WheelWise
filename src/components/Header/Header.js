import { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import PersonIcon from "@mui/icons-material/Person";
import Button from "@mui/material/Button";
import Logout from "@mui/icons-material/Logout";
import MenuItem from "@mui/material/MenuItem";
import logo from "../../img/logo.png";
import { PAGES, accountSlotProps, navSlotProps } from "./constants/constants";
import "./css/header.css";
import { ListItemIcon } from "@mui/material";
import { useSelector } from "react-redux";
import { selectLoggedInUser } from "../../redux/authSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";

function Header() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const loggedInUser = useSelector(selectLoggedInUser);
  const user = useSelector((state) => state.authSlice.loggedInUser);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseUserMenu = () => setAnchorElUser(null);
  const handleCloseNavMenu = () => setAnchorElNav(null);
  const handleOnClick = (page = "") => {
    handleCloseNavMenu();
    navigate(`/${page ? page.split(" ").join("").toLowerCase() : ""}`);
    window.scrollTo({ top: 0 });
  };
  const handleOpenProfile = () => navigate("/profile/information");

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AppBar
      color="transparent"
      position="fixed"
      sx={{
        boxShadow: "none",
        backgroundColor: isScrolled ? "rgba( 0, 0, 0, 0.7)" : "transparent",
        transition: "background-color 0.3s ease",
      }}
    >
      <Container maxWidth="lg">
        <Toolbar sx={{ justifyContent: "space-between" }} disableGutters>
          <img
            onClick={() => handleOnClick()}
            src={logo}
            alt="logo"
            className="logo"
          />
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon sx={{ color: "white" }} />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              slotProps={navSlotProps}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
              disableScrollLock={true}
            >
              {PAGES.map((page) => (
                <MenuItem
                  fullwidth="true"
                  key={page}
                  onClick={() => handleOnClick(page)}
                >
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "space-evenly",
              px: 2,
            }}
          >
            {PAGES.map((page) => (
              <Button
                fullwidth="true"
                key={page}
                onClick={() => handleOnClick(page)}
                sx={{
                  color:
                    pathname.slice(1) === page.split(" ").join("").toLowerCase()
                      ? "#4DA8DA"
                      : "white",
                  display: "block",
                  textTransform: "none",
                  height: "100%",
                }}
                variant="text"
              >
                {page}
              </Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0, order: 2 }}>
            <IconButton
              tabIndex={-1}
              onClick={
                loggedInUser ? handleOpenUserMenu : () => navigate("/signin")
              }
              sx={{ p: 0 }}
            >
              {loggedInUser ? (
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Avatar alt={user.firstName} src={user.photoURL} />
                  <Typography
                    sx={{ color: "white", fontSize: "14px", ml: "5px" }}
                  >
                    {user.firstName}
                  </Typography>
                </div>
              ) : (
                <div style={{ display: "flex", alignItems: "center" }}>
                  <PersonIcon
                    sx={{
                      color: "white",
                      fontSize: { xs: "1.5rem", md: "2rem" },
                    }}
                  />
                  <Typography
                    sx={{ color: "white", fontSize: "14px", ml: "5px" }}
                  >
                    Sign In
                  </Typography>
                </div>
              )}
            </IconButton>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              slotProps={accountSlotProps}
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
              onClose={handleCloseUserMenu}
              disableScrollLock={true}
            >
              <MenuItem
                onClick={() => {
                  handleCloseUserMenu();
                  handleOpenProfile();
                }}
              >
                <Avatar /> My account
              </MenuItem>
              <MenuItem
                onClick={() => {
                  signOut(getAuth());
                  navigate("/");
                }}
              >
                <ListItemIcon>
                  <Logout sx={{ color: "white" }} fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
