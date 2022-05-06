import { Box, Typography, InputLabel, TextField, Button } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import "../AddBlog/style.css";
import { useNavigate } from "react-router-dom";
function AddBlog() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    imageURL: "",
  });

  const handleChange = (e) => {
    setInputs((prevstate) => ({
      ...prevstate,
      [e.target.name]: e.target.value,
    }));
  };

  const sendRequest = async () => {
    const res = await axios
      .post("http://localhost:5000/api/blog/add", {
        title: inputs.title,
        description: inputs.description,
        image: inputs.imageURL,
        user: localStorage.getItem("userId"),
      })
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    sendRequest()
      .then((data) => console.log(data))
      .then(() => navigate("/blogs"));
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <Box className="add__blog__box">
          <Typography variant="h2" className="add__blog__heading">
            Post Your Blog
          </Typography>
          <InputLabel className="add__blog__inputlabel">Title</InputLabel>
          <TextField
            name="title"
            value={inputs.title}
            onChange={handleChange}
          />
          <InputLabel className="add__blog__inputlabel">Description</InputLabel>
          <TextField
            name="description"
            value={inputs.description}
            onChange={handleChange}
          />
          <InputLabel className="add__blog__inputlabel">ImageURL</InputLabel>
          <TextField
            name="imageURL"
            value={inputs.imageURL}
            onChange={handleChange}
          />
          <Button className="add__button" type="submit">
            Submit
          </Button>
        </Box>
      </form>
    </>
  );
}

export default AddBlog;
