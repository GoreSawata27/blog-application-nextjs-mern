"use client";

import { useEffect, useState } from "react";
import _api from "@/utils/_api";

import UpdateBlog from "@/Components/UpdateBlog";
import { useRouter } from "next/navigation";
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

export default function BlogInfo({ params }) {
  const { slug } = params;
  const [blog, setBlog] = useState(null);
  const [error, setError] = useState(null);
  const [isDeleteing, setIsDeleteing] = useState(null);
  const navigate = useRouter();

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fetchBlog = async () => {
    try {
      const response = await _api.get(`/api/posts/${slug}`);
      setBlog(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred");
    }
  };

  useEffect(() => {
    if (slug) {
      fetchBlog();
    }
  }, [slug]);

  if (error) return <div>Error: {error}</div>;
  if (!blog)
    return (
      <div className="mt-5 ">
        <CardLoading />
      </div>
    );

  const handelDeleteBlog = () => {
    setIsDeleteing(true);
    _api
      .delete(`/api/posts/${slug}`)
      .then((response) => {
        console.log(response);
        navigate.push(`/dashboard/blogs`);
      })
      .catch((err) => {
        setIsDeleteing(false);
        setError(err.response?.data?.message || "An error occurred");
      });
  };

  return (
    <>
      <div className="max-w-4xl p-6 mx-auto my-10 bg-white rounded-lg shadow-md">
        <h1 className="mb-6 text-4xl font-bold text-center text-gray-800">
          {blog.title}
        </h1>

        <div className="mb-4">
          <img
            src={blog.image}
            alt={blog.title}
            className="object-cover rounded-lg shadow-md w-54 h-52"
          />
        </div>

        <p className="mb-6 text-lg leading-relaxed text-gray-700">
          {blog.description}
        </p>
        <div className="flex gap-2">
          <div className="text-right">
            <button
              onClick={handleClickOpen}
              className="px-4 py-2 text-white bg-[#6C5DD3] rounded-md hover:bg-[#6f5ee0]"
            >
              Update
            </button>
          </div>
          <div className="text-right">
            <button
              onClick={handelDeleteBlog}
              disabled={isDeleteing}
              className="px-4 py-2 text-white bg-[#6C5DD3] rounded-md hover:bg-[#6d5cde] disabled:opacity-60 disabled:cursor-not-allowed"
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="m-width">
          <UpdateBlog setOpen={setOpen} slug={slug} fetchBlog={fetchBlog} />
        </Box>
      </Modal>
    </>
  );
}
