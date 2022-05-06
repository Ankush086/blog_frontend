import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  Tabs,
  Tab,
} from "@mui/material";
import "../Header/style.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store";

function Header() {
  const [value, setValue] = useState(0);
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const dispatch = useDispatch();
  return (
    <div>
      <AppBar position="sticky" className="header__main">
        <Toolbar>
          <Typography className="logo" variant="h4">
            BlogsApp
          </Typography>

          {isLoggedIn && (
            <Box className="header__blogs__links">
              <Tabs
                className="header__blogs__links__tabs"
                value={value}
                onChange={(e, value) => setValue(value)}
              >
                <Tab LinkComponent={Link} to="/blogs" label="All Blogs" />
                <Tab LinkComponent={Link} to="/myblogs" label="My Blogs" />
                <Tab LinkComponent={Link} to="/blogs/add" label="Add Blogs" />
              </Tabs>
            </Box>
          )}

          <Box className="user-validation">
            {!isLoggedIn && (
              <>
                <Button LinkComponent={Link} to="/auth" variant="contained">
                  Login
                </Button>
                <Button LinkComponent={Link} to="/auth" variant="contained">
                  SignUp
                </Button>
              </>
            )}
            {isLoggedIn && (
              <Button
                onClick={() => dispatch(authActions.logout())}
                LinkComponent={Link}
                to="/auth"
                variant="contained"
              >
                LogOut
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;
