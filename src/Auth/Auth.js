import React, { useState } from "react";
import axios from "axios";
import "../Auth/style.css";
import {
  Typography,
  Box,
  TextField,
  Button,
  inputClasses,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { authActions } from "../store";
import { useNavigate } from "react-router-dom";

function Auth() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isSignUp, setisSignUp] = useState(false);
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
  });

  const sendRequest = async (type = "login") => {
    const res = await axios
      .post(`http://localhost:5000/api/user/${type}`, {
        name: input.name,
        email: input.email,
        password: input.password,
      })
      .catch((error) => console.log(error));
    const data = await res.data;
    return data;
  };

  const handleChange = (e) => {
    setInput((prevstate) => ({
      ...prevstate,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(input);
    if (isSignUp) {
      sendRequest("signUp")
        .then((data) => {
          localStorage.setItem("userId", data.user._id);
        })
        .then(() => dispatch(authActions.login()))
        .then(() => navigate("/blogs"))
        .then((data) => console.log(data));
    } else {
      sendRequest()
        .then((data) => localStorage.setItem("userId", data.User._id))
        .then(() => dispatch(authActions.login()))
        .then(() => navigate("/blogs"))
        .then((data) => console.log(data));
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Box className="validation__box">
          <Typography>{isSignUp ? "SignUp" : "Login"}</Typography>
          {isSignUp && (
            <TextField
              placeholder="Name"
              className="input__textfield"
              value={input.name}
              name="name"
              onChange={handleChange}
            />
          )}
          <TextField
            type={"email"}
            name="email"
            placeholder="Email"
            className="input__textfield"
            value={input.email}
            onChange={handleChange}
          />

          <TextField
            type={"password"}
            name="password"
            placeholder="Password"
            className="input__textfield"
            value={input.password}
            onChange={handleChange}
          />

          <Button
            type="submit"
            varirant="contained"
            className="validation__button"
          >
            Submit
          </Button>
          <Button
            onClick={() => setisSignUp(!isSignUp)}
            className="validation__button__btn2"
          >
            {isSignUp ? "Login" : "SignUp"}
          </Button>
        </Box>
      </form>
    </>
  );
}

export default Auth;
