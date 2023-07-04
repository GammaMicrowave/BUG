"use client";

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import ThemeContext from "@/contexts/theme.context";
import { useContext, useEffect } from "react";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import ChatIcon from "@mui/icons-material/Chat";
import cookieCutter from "cookie-cutter";
import { useRouter } from "next/router";
const pages = ["Home", "Chat", "Blog"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];
import { useQuery, useQueryClient } from "react-query";
import { getSelfData } from "@/API/user.api";

function ResponsiveAppBar({ openDrawer, setOpenDrawer }) {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const queryClient = useQueryClient();
  const [token, setToken] = React.useState("");
  const [user, setUser] = React.useState(null);
  useEffect(() => {
    setIsLoggedIn(cookieCutter.get("jwt_token") ? true : false);
    setToken((prev) => cookieCutter.get("jwt_token"));
  }, []);

  // if (isLoggedIn) {
  const { data, isLoading, isError } = useQuery(["selfData"], getSelfData, {
    onSuccess: (data) => {
      setUser(data);
    },
    onError: (err) => {
      console.log(err);
    },
    enabled: isLoggedIn,
  });
  // }
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  let { theme, toggleTheme } = useContext(ThemeContext);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (e) => {
    const page = e.target.innerText.toLowerCase();
    router.push(`/${page}`);
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleAccount = () => {
    handleCloseUserMenu();
  };
  const handleLogout = () => {
    // request.cookies.set("jwt_token", "");
    cookieCutter.set("jwt_token", "");
    setIsLoggedIn(false);
    window.location.reload();
    handleCloseUserMenu();
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        bgcolor: theme.palette.background.default,
        color: theme.palette.text.primary,
        zIndex: 1400,
        height: 64,
      }}
      className="flex justify-center items-center"
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            sx={{
              display: { xs: "flex", md: "none" },
            }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
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
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon
            sx={{
              display: "flex",
              mr: 1,
            }}
          />
          <Typography
            variant="h6"
            noWrap
            onClick={() => {
              router.push("/");
            }}
            sx={{
              display: "flex",
              fontFamily: "monospace",
              fontWeight: 700,
              //   flexGrow: 1,
              flexGrow: {
                xs: 1,
                md: 0,
              },
              paddingRight: "0.2rem",
              paddingTop: "0.2rem",
              letterSpacing: ".2rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            BUG
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{
                  mx: 1,
                  color: "inherit",
                }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <IconButton
              sx={{
                color: "inherit",
              }}
              className="m-2"
              onClick={() => {
                setOpenDrawer(!openDrawer);
              }}
            >
              <ChatIcon />
            </IconButton>
            <IconButton className="mr-2" onClick={toggleTheme}>
              {theme.palette.mode === "dark" ? (
                <DarkModeIcon />
              ) : (
                <LightModeIcon />
              )}
            </IconButton>
            {isLoggedIn ? (
              <>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="Remy Sharp" src={user?.image} />
                  </IconButton>
                </Tooltip>

                <Menu
                  sx={{ mt: "45px" }}
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
                  onClose={handleCloseUserMenu}
                >
                  {/* {settings.map((setting) => ( */}
                  <MenuItem onClick={handleAccount}>
                    <Typography textAlign="center">Account</Typography>
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>
                    <Typography textAlign="center">Logout</Typography>
                  </MenuItem>

                  {/* ))} */}
                </Menu>
              </>
            ) : (
              <Button
                variant="contained"
                onClick={() => {
                  router.push("/signin");
                }}
              >
                Sign In
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
