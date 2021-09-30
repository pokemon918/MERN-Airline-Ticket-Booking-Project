import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Box,
} from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  title: {
    display: "inline-block",
    color: "#fff",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textDecoration: "none",
    overflow: "hidden !important",
  },
  authMainMenu: {
    display: "none",
    ["@media (min-width:780px)"]: {
      display: "flex",
    },
  },
  authSubMenu: {
    display: "flex",
    ["@media (min-width:780px)"]: {
      display: "none",
    },
  },
}));

const MenuBar = (props) => {
  const classes = useStyles();
  const [auth, setAuth] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography
          variant="h6"
          className={classes.title}
          component={Link}
          sx={{ flexGrow: 1 }}
          to="/"
        >
          Airline Ticket Booking
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        {props.user.isAuth !== true ? (
          <Box className={classes.authMainMenu}>
            <Typography
              component={Link}
              to="/signin"
              color="inherit"
              style={{ textDecoration: "none", marginLeft: "10px" }}
            >
              Signin
            </Typography>
            <Typography
              component={Link}
              to="/signup"
              color="inherit"
              style={{ textDecoration: "none", marginLeft: "10px" }}
            >
              Signup
            </Typography>
          </Box>
        ) : (
          <Box className={classes.authMainMenu}>
            <Typography
              component={Link}
              to="/profile"
              color="inherit"
              style={{ textDecoration: "none", marginLeft: "10px" }}
            >
              My Profile
            </Typography>
            {props.user.isAdmin === true ? (
              <Typography
                component={Link}
                to="/admin-page"
                color="inherit"
                style={{ textDecoration: "none", marginLeft: "10px" }}
              >
                Admin Panel
              </Typography>
            ) : null}
            <Typography
              component={Link}
              to="/signout"
              color="inherit"
              style={{ textDecoration: "none", marginLeft: "10px" }}
            >
              Signout
            </Typography>
          </Box>
        )}
        {props.user.isAuth !== true ? (
          <div className={classes.authSubMenu}>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>
                <Typography
                  component={Link}
                  to="/signin"
                  color="inherit"
                  style={{ textDecoration: "none", marginLeft: "10px" }}
                >
                  Signin
                </Typography>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Typography
                  component={Link}
                  to="/signup"
                  color="inherit"
                  style={{ textDecoration: "none", marginLeft: "10px" }}
                >
                  Signup
                </Typography>
              </MenuItem>
            </Menu>
          </div>
        ) : (
          <div className={classes.authSubMenu}>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>
                <Typography
                  component={Link}
                  to="/profile"
                  color="inherit"
                  style={{ textDecoration: "none", marginLeft: "10px" }}
                >
                  My Profile
                </Typography>
              </MenuItem>
              {props.user.isAdmin === true ? (
                <MenuItem onClick={handleClose}>
                  <Typography
                    component={Link}
                    to="/admin-page"
                    color="inherit"
                    style={{ textDecoration: "none", marginLeft: "10px" }}
                  >
                    Admin Panel
                  </Typography>
                </MenuItem>
              ) : null}

              <MenuItem onClick={handleClose}>
                <Typography
                  component={Link}
                  to="/signout"
                  color="inherit"
                  style={{ textDecoration: "none", marginLeft: "10px" }}
                >
                  Signout
                </Typography>
              </MenuItem>
            </Menu>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default MenuBar;
