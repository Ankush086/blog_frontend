import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Box, Typography, InputLabel, TextField, Button } from "@mui/material";
import "../AddBlog/style.css";

function BlogDetail() {
  const navigate = useNavigate();
  const [blog, setBlog] = useState();
  const [inputs, setInputs] = useState({});
  const id = useParams().id;

  const handleChange = (e) => {
    setInputs((prevstate) => ({
      ...prevstate,
      [e.target.name]: e.target.value,
    }));
  };
  const fetchDetails = async () => {
    const res = await axios
      .get(`http://localhost:5000/api/blog/${id}`)
      .catch((error) => console.log(error));
    const data = await res.data;
    return data;
  };

  useEffect(() => {
    fetchDetails().then((data) => {
      setBlog(data.blog);
      setInputs({
        title: data.blog.title,
        description: data.blog.description,
      });
    });
  }, [id]);

  const sendRequest = async () => {
    const res = await axios
      .put(`http://localhost:5000/api/blog/update/${id}`, {
        title: inputs.title,
        description: inputs.description,
      })
      .catch((error) => console.log(error))
      .then(() => navigate("/myBlogs/"));
    const data = await res.data;
    return data;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest().then((data) => console.log(data));
  };
  return (
    <>
      {inputs && (
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
            <InputLabel className="add__blog__inputlabel">
              Description
            </InputLabel>
            <TextField
              name="description"
              value={inputs.description}
              onChange={handleChange}
            />

            <Button className="add__button" type="submit">
              Submit
            </Button>
          </Box>
        </form>
      )}
    </>
  );
}

export default BlogDetail;
