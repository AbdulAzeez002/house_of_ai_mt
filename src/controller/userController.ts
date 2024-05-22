import { Request, Response } from "express";
import mongoose from "mongoose";
import User from "../models/userSchema";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = async (req: Request, res: Response) => {
  try {
    console.log(req.body, "request body");
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
// @route : POST /api/users/login
// @access : public

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
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

const generateToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET as string, {
    expiresIn: "30d",
  });
};
