import "./App.css";
import Header from "./Header/Header";
import React, { useEffect } from "react";
import Auth from "./Auth/Auth";
import Blog from "./Blog/Blog";
import { Route, Routes } from "react-router-dom";
import UserBlog from "./UserBlog/UserBlog";
import BlogDetail from "./BlogDetail/BlogDetail";
import AddBlog from "./AddBlog/AddBlog";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./store";

function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  console.log(isLoggedIn);
  useEffect(() => {
    if (localStorage.getItem("userId")) {
      dispatch(authActions.login());
    }
  }, [dispatch]);
  return (
    <>
      <header>
        <Header />
      </header>
      <main>
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="/blogs" element={<Blog />} />
          <Route path="/blogs/add" element={<AddBlog />} />
          <Route path="/myblogs" element={<UserBlog />} />
          <Route path="/myBlogs/:id" element={<BlogDetail />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
