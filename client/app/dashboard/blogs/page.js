"use client";
import Card from "@/Components/Card";
import _api from "@/utils/_api";
import { useEffect, useState } from "react";

import * as React from "react";
import Dialog from "@mui/material/Dialog";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import CreateBlog from "@/Components/CreateBlog";

export default function Blogs() {
  const [allBlogs, setAllBlogs] = useState([]);
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getAllPosts = async () => {
    try {
      const response = await _api.get("/api/posts");
      setAllBlogs(response.data?.reverse());
    } catch (error) {
      console.error("Failed to fetch blogs:", error);
    }
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <>
      <div className="blog-page">
        <div className="title">Blogs</div>
        <div className="flex gap-3 btns">
          <button className="btn add-btn" onClick={handleClickOpen}>
            Add New
          </button>
          <button className="btn preview-btn">Preview</button>
        </div>
      </div>

      <div className="blog-container">
        {allBlogs.length > 0 ? (
          allBlogs.map((blog) => (
            <Card
              key={blog._id}
              title={blog.title}
              description={blog.description}
              image={blog.image}
              createdAt={blog.createdAt}
            />
          ))
        ) : (
          <p>No blogs available</p>
        )}
      </div>
      <>
        <Dialog
          fullScreen={fullScreen}
          open={open}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <CreateBlog setOpen={setOpen} getAllPosts={getAllPosts} />
        </Dialog>
      </>
    </>
  );
}
