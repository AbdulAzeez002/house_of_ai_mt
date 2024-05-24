import request from "supertest";
import mongoose from "mongoose";
import { app, startServer, closeServer } from "..";
import Todo from "../models/todoSchema";
import User from "../models/userSchema";
import { generateToken } from "../utils/common";
import dotenv from "dotenv";

jest.setTimeout(10000); 
// Load test environment variables
dotenv.config({ path: ".env.test" });

let token: string;

beforeAll(async () => {
  // Start the server to ensure the database is connected
  await startServer();

  // Create a user and get a token
  const user = new User({
    email: "testuser",
    password: "testpassword",
    name: "user",
  });
  await user.save();
  token = generateToken(user._id as string);
});

afterAll(async () => {
  // Clean up the database
  await User.deleteMany({});
  await Todo.deleteMany({});
  await mongoose.connection.close();
  await closeServer();
});

describe("Todo API", () => {
  it("should create a new todo", async () => {
    const res = await request(app)
      .post("/api/todo")
      .set("Authorization", `Bearer ${token}`)
      .send({ content: "Test todo" });

    expect(res.status).toBe(201);
    expect(res.body.content).toBe("Test todo");
  });

  it("should get all todos", async () => {
    const res = await request(app)
      .get("/api/todo")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  it("should get a single todo", async () => {
    const todo = new Todo({
      content: "Test single todo",
      user: (await User.findOne({ email: "testuser" }))?._id,
    });
    await todo.save();

    const res = await request(app)
      .get(`/api/todo/${todo._id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.content).toBe("Test single todo");
  });

  it("should edit a todo", async () => {
    const todo = new Todo({
      content: "Test edit todo",
      user: (await User.findOne({ email: "testuser" }))?._id,
    });
    await todo.save();

    const res = await request(app)
      .put(`/api/todo/${todo._id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ content: "Edited todo" });

    expect(res.status).toBe(200);
    expect(res.body.edited).toBe(true);

    const updatedTodo = await Todo.findById(todo._id);
    expect(updatedTodo?.content).toBe("Edited todo");
  });

  it("should delete a todo", async () => {
    const todo = new Todo({
      content: "Test delete todo",
      user: (await User.findOne({ email: "testuser" }))?._id,
    });
    await todo.save();

    const res = await request(app)
      .delete(`/api/todo/${todo._id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.deleted).toBe(true);

    const deletedTodo = await Todo.findById(todo._id);
    expect(deletedTodo).toBeNull();
  });
});
