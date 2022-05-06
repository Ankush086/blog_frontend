import React from "react";
import {
  Avatar,
  CardContent,
  CardMedia,
  Typography,
  Card,
  CardHeader,
  Icon,
  IconButton,
  Box,
} from "@mui/material";
import "../Blog/style.css";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function BlogCard({ title, description, image, userName, id, isUser }) {
  const navigate = useNavigate();
  console.log(id);
  const handleEdit = (e) => {
    navigate(`/myBlogs/${id}`);
  };

  const deleteReq = async () => {
    const res = await axios
      .delete(`http://localhost:5000/api/blog/${id}`)
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };

  const handleDelete = async () => {
    deleteReq()
      .then(() => navigate("/"))
      .then(() => navigate("/blogs"));
  };
  return (
    <Card className="card__main">
      {isUser && (
        <Box className="card__edit">
          <IconButton onClick={handleEdit} className="card__edit__button">
            <EditIcon className="edit__button btn" />
          </IconButton>
          <IconButton onClick={handleDelete}>
            <DeleteForeverIcon className="delete__button btn" />
          </IconButton>
        </Box>
      )}
      <CardHeader
        className="card__Header"
        avatar={
          <Avatar className="card__avatar" aria-label="recipe">
            {userName[0]}
          </Avatar>
        }
        title={title}
      />

      <CardMedia
        className="card__Media"
        // componePnt={image}
        image={image}
        alt="Paella dish"
      />

      <CardContent>
        <hr />
        <br />
        <Typography variant="body2" color="text.secondary">
          <b> {userName} </b> {":"} {description}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default BlogCard;
