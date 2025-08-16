import express from "express";
const router = express.Router();

import { createBlog, getBlogs, getBlogById, updateBlog, deleteBlog } from "../controller/blogController.js";

import { protect } from "../middleware/authMiddleware.js";

// Public routes
router.get("/", getBlogs);
router.get("/:id", getBlogById);

// Protected routes
router.post("/", protect, createBlog);
router.put("/:id", protect, updateBlog);
router.delete("/:id", protect, deleteBlog);

export default router;
