import express from "express";
import { registerUser,loginUser } from "../controller/userController";

const router = express.Router();

// route for fetching all the tasks
router.post("/signin", registerUser);
router.post("/login", loginUser);


export default router;
