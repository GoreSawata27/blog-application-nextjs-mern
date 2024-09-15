"use client";
import Card from "@/Components/Card";
import _api from "@/utils/_api";
import { useEffect, useState } from "react";

import * as React from "react";
import CreateBlog from "@/Components/CreateBlog";
import CardLoading from "@/Components/CardLoading";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50vw",
  maxWidth: "1222px",
  maxHeight: "580px",
  minWidth: "300px",
  border: "none",
  boxShadow: "none",
  p: 4,
  overflow: "auto",
  borderRadius: "12px",
  zIndex: "9998",
  transition: "all 0.3s ease-in-out",
};

export default function Blogs() {
  const [allBlogs, setAllBlogs] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsloading] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getAllPosts = async () => {
    setIsloading(true);
    try {
      const response = await _api.get("/api/posts");
      setAllBlogs(response.data?.reverse());
    } catch (error) {
      console.error("Failed to fetch blogs:", error);
    } finally {
      setIsloading(false);
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
        {allBlogs.length > 0 &&
          allBlogs.map((blog) => (
            <Card
              key={blog._id}
              title={blog.title}
              description={blog.description}
              image={blog.image}
              createdAt={blog.createdAt}
              id={blog._id}
            />
          ))}
        {allBlogs.length < 0 && !isLoading && <p>No blogs available</p>}
        {isLoading && (
          <>
            <CardLoading />
            <CardLoading />
            <CardLoading />
          </>
        )}
      </div>
      <>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style} className="m-width">
            <CreateBlog setOpen={setOpen} getAllPosts={getAllPosts} />
          </Box>
        </Modal>
      </>
    </>
  );
}
