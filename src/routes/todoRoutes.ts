import express from "express";
import {
 createTodo,deleteTodo,editTodo,getAllTodos,getSingleTodo
} from "../controller/todoController";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();

// route for fetching all the tasks
router.post("/",protect, createTodo);
router.get("/", protect,getAllTodos);
router.get("/:id", protect, getSingleTodo);
router.put("/:id", protect, editTodo);
router.delete("/:id", protect, deleteTodo);


export default router;
