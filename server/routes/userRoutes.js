import express from "express";

import { registerUser, loginUser, getAllUsers, getUserById } from "../controller/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// Protected routes
router.get("/users", protect, getAllUsers);
router.get("/user/:id", protect, getUserById);

export default router;
