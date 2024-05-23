import { Request, Response } from "express";
import Todo from "../models/todoSchema";
import User from "../models/userSchema";

//@description: Create Todo
// @route : POST /api/todo
// @access : public
export const createTodo = async (req: Request, res: Response) => {
  try {
    const { content } = req.body;
    const userId = (req as any)?.user?.id;

    if (!content) {
      throw new Error("Please add all fields");
    }

    // create Todo

    const todo = await Todo.create({
      content,
      user: userId,
    });

    if (!todo) {
      throw new Error(
        "Unable to create todo, Please try again and check all the fields are given correctly"
      );
    }

    res.status(201).json(todo);
  } catch (error) {
    res.status(400).json({ error: (error as Error)?.message });
  }
};

//@description: Delete Todo
// @route : DELETE /api/todo/:id
// @access : private
export const deleteTodo = async (req: Request, res: Response) => {
  try {
    const idFromToken = (req as any)?.user?.id;
    const { id } = req.params;

    const todo = await Todo.findById(id);
    if (!todo) {
      throw new Error("No todo found with given id");
    }

    if (todo.user.toString() !== idFromToken) {
      throw new Error("you are not authorized to delete");
    }

    await Todo.findByIdAndDelete(id);
    res.status(200).json({ deleted: true, id: id });
  } catch (error) {
    res.status(400).json({ error: (error as Error)?.message });
  }
};

//@description: Edit todo
// @route : PUT /api/todo/:id
// @access : private
export const editTodo = async (req: Request, res: Response) => {
  try {
    const idFromToken = (req as any)?.user?.id;
    const { id } = req.params;
    const { content } = req.body;

    const todo = await Todo.findById(id);
    if (!todo) {
      throw new Error("No todo found with given id");
    }

    if (todo.user.toString() !== idFromToken) {
      throw new Error("you are not authorized to edit");
    }

    await Todo.findByIdAndUpdate(id, { content: content });
    res.status(200).json({ edited: true });
  } catch (error) {
    res.status(400).json({ error: (error as Error)?.message });
  }
};

//@description: Get All Todos
// @route : GET /api/todo
// @access : private

export const getAllTodos = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const idFromToken = (req as any)?.user?.id;

    const todo = await Todo.find({ user: idFromToken });

    res.status(200).json(todo);
  } catch (error) {
    res.status(400).json({ error: (error as Error)?.message });
  }
};

//@description: Get Single
// @route : GET /api/todo:id
// @access : private

export const getSingleTodo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const todo = await Todo.findById(id);
    if (!todo) {
      throw new Error("Todo not found");
    }

    res.status(200).json(todo);
  } catch (error) {
    res.status(400).json({ error: (error as Error)?.message });
  }
};
