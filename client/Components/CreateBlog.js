"use client";
import React, { useState } from "react";
import _api from "@/utils/_api";
import axios from "axios";

export default function CreateBlog({ setOpen, getAllPosts }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", imageFile);
      formData.append("upload_preset", "ml_default");
      formData.append("cloud_name", "dgfc01mnb");

      const imageUploadResponse = await axios.post(
        "https://api.cloudinary.com/v1_1/dgfc01mnb/image/upload",
        formData
      );

      const imageUrl = imageUploadResponse.data.secure_url;

      const blogData = {
        title,
        description,
        image: imageUrl,
      };

      await _api.post("/api/posts", blogData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      setTitle("");
      setDescription("");
      setImageFile(null);
      setOpen(false);
      getAllPosts();
    } catch (error) {
      console.error("Error posting blog:", error);
      alert("Failed to post blog");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="blog-post-form">
      <div className="form-group">
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="input "
        />
      </div>

      <div className="form-group">
        <label>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="textarea"
        />
      </div>

      <div className="form-group">
        <label>Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          required
          className="input"
        />
      </div>

      <button type="submit" className="submit-btn" disabled={isUploading}>
        {isUploading ? "Uploading..." : "Submit Blog"}
      </button>
    </form>
  );
}
