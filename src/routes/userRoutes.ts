import express from "express";
import {
  registerUser,
  loginUser,
  editUser,
  deleteUser,
  getMe,
} from "../controller/userController";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();

// route for fetching all the tasks
router.post("/signin", registerUser);
router.post("/login", loginUser);
router.get("/:id", protect, getMe);
router.put("/:id", protect, editUser);
router.delete("/:id", protect, deleteUser);


export default router;
