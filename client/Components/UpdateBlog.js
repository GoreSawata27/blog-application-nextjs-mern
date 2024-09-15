"use client";
import React, { useEffect, useState } from "react";
import _api from "@/utils/_api";
import axios from "axios";

export default function UpdateBlog({ setOpen, slug, fetchBlog }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const getPostsByID = async () => {
    try {
      const response = await _api.get(`/api/posts/${slug}`);
      setTitle(response.data?.title);
      setDescription(response.data?.description);
      setImageUrl(response.data?.image);
    } catch (error) {
      console.error("Failed to fetch blogs:", error);
    }
  };

  useEffect(() => {
    getPostsByID();
  }, []);

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
      let updatedImageUrl = imageUrl;

      if (imageFile) {
        const formData = new FormData();
        formData.append("file", imageFile);
        formData.append("upload_preset", "ml_default");
        formData.append("cloud_name", "dgfc01mnb");

        const imageUploadResponse = await axios.post(
          "https://api.cloudinary.com/v1_1/dgfc01mnb/image/upload",
          formData
        );

        updatedImageUrl = imageUploadResponse.data.secure_url;
      }

      const blogData = {
        title,
        description,
        image: updatedImageUrl,
      };

      await _api.put(`/api/posts/${slug}`, blogData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      setTitle("");
      setDescription("");
      setImageFile(null);
      setImageUrl(updatedImageUrl);
      fetchBlog();
      setOpen(false);
    } catch (error) {
      console.error("Error posting blog:", error);
      alert("Failed to update blog");
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
          className="input"
        />
      </div>

      <div className="form-group">
        <label>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="textarea"
        />
      </div>

      <div className="form-group">
        <label>Current Image</label>
        {imageFile ? (
          <img src={URL.createObjectURL(imageFile)} alt="New Preview" />
        ) : (
          <img src={imageUrl} alt="Current Image" />
        )}
      </div>

      <div className="form-group">
        <label>Upload New Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="input"
        />
      </div>

      <button type="submit" className="submit-btn" disabled={isUploading}>
        {isUploading ? "Updating..." : "Update"}
      </button>
    </form>
  );
}
