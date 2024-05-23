import { Request, Response } from "express";
import User from "../models/userSchema";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/common";

//@description: Register a user
// @route : POST /api/user/signin
// @access : public
export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      throw new Error("Please add all fields");
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      throw new Error("User already exists");
    }

    // Hash password

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create User

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    if (user) {
      res.status(201).json({
        name: user.name,
        email: user.email,
        _id: user._id,
        token: generateToken(user._id as string),
      });
    } else {
      throw new Error("invalid user details");
    }
  } catch (error) {
    console.log(error, "erro");
    res.status(400).json({ error: (error as Error)?.message });
  }
};

//@description: authenticate a user
// @route : POST /api/user/login
// @access : public
export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new Error("Please add all fields");
    }

    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      res.status(200).json({
        name: user.name,
        email: user.email,
        _id: user._id,
        token: generateToken(user?._id as string),
      });
    } else {
      throw new Error("invalid  details");
    }
  } catch (error) {
    console.log(error, "erro");
    res.status(400).json({ error: (error as Error)?.message });
  }
};

//@description: Delete user account
// @route : DELETE /api/user/:id
// @access : private
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const idFromToken = (req as any)?.user?.id;
    const { id } = req.params;

    if (idFromToken !== id) {
      throw new Error("you are not authorized to delete");
    }
    await User.findByIdAndDelete(id);
    res.status(200).json({ deleted: true, id: id });
  } catch (error) {
    res.status(400).json({ error: (error as Error)?.message });
  }
};

//@description: Edit user details
// @route : PUT /api/user/:id
// @access : private
export const editUser = async (req: Request, res: Response) => {
  try {
    const idFromToken = (req as any)?.user?.id;
    const { id } = req.params;
    const { name, email } = req.body;

    if (idFromToken !== id) {
      throw new Error("you are not authorized to edit");
    }
    await User.findByIdAndUpdate(id, { name: name, email: email });
    res.status(200).json({ edited: true });
  } catch (error) {
    res.status(400).json({ error: (error as Error)?.message });
  }
};

//@description: Get user data
// @route : GET /api/user/:id
// @access : private

export const getMe = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);
    if (!user) {
      throw new Error("User not found");
    }

    res.status(200).json({
      id: user._id,
      email: user.email,
      name: user.name,
    });
  } catch (error) {
    res.status(400).json({ error: (error as Error)?.message });
  }
};
