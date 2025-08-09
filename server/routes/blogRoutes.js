import express from "express";
import { createBlog, getBlogs, getBlogById, updateBlog, deleteBlog } from "../controller/blogController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(getBlogs).post(protect, createBlog);
router.route("/:id").get(getBlogById).put(protect, updateBlog).delete(protect, deleteBlog);

export default router;
