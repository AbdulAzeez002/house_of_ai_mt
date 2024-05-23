import dotenv from "dotenv";
dotenv.config();
import express, { Request, Response } from "express";
import connectToMongoDB from "./config/db";
import userRouter from "./routes/userRoutes";
import tododRouter from './routes/todoRoutes'

// Connecting to MongoDb
connectToMongoDB();

export const app = express();
const port = process.env.PORT ?? 8000;

app.use(express.json()); // middleware to print json data
app.use(express.urlencoded({ extended: false }));

// app.get("/", (req: Request, res: Response) => {
//   res.send("Hello World!");
// });

app.use("/api/user", userRouter);
app.use("/api/todo", tododRouter); 

export const server = app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});


