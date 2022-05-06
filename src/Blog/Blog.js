import axios from "axios";
import React, { useEffect, useState } from "react";
import BlogCard from "./BlogCard";

function Blog() {
  const [blog, setBlog] = useState();
  const sendRequest = async () => {
    const res = await axios
      .get("http://localhost:5000/api/blog")
      .catch((err) => console.log(err));
    const data = await res.data;
    console.log(data);
    return data;
  };
  useEffect(() => {
    sendRequest().then((data) => setBlog(data.blogs));
  }, []);
  return (
    <>
      {blog &&
        blog.map((blog, index) => (
          <BlogCard
            isUser={localStorage.getItem("userId") === blog.user._id}
            title={blog.title}
            description={blog.description}
            image={blog.image}
            userName={blog.user.name}
          />
        ))}
    </>
  );
}

export default Blog;
