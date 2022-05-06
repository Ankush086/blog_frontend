import React, { useEffect, useState } from "react";
import axios from "axios";
import BlogCard from "../Blog/BlogCard";
function UserBlog() {
  const id = localStorage.getItem("userId");
  const [user, setUser] = useState();
  const sendRequest = async () => {
    const res = await axios
      .get(`http://localhost:5000/api/blog/user/${id}`)
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };

  useEffect(() => {
    sendRequest().then((data) => setUser(data.user));
  }, []);
  console.log(user);
  return (
    <>
      {user &&
        user.blogs &&
        user.blogs.map((blog, index) => (
          <BlogCard
            id={blog._id}
            isUser={true}
            key={index}
            title={blog.title}
            description={blog.description}
            image={blog.image}
            userName={user.name}
          />
        ))}
    </>
  );
}

export default UserBlog;
