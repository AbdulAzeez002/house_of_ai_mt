import dotenv from "dotenv";
dotenv.config();
import express from "express";
import connectToMongoDB from "./config/db";
import userRouter from "./routes/userRoutes";
import todoRouter from './routes/todoRoutes';
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../swagger.json";

const app = express();
const port = process.env.PORT ?? 8000;

// Middleware to serve Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api/user", userRouter);
app.use("/api/todo", todoRouter);
app.use("/api/test",(req,res)=>{
  res.send("working fine")
})

let server: any;

const startServer = async () => {
  const dbUrl = process.env.MONGODB_URL ?? ""
  await connectToMongoDB(dbUrl);
  server = app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
  });
};

const closeServer = async () => {
  if (server) {
    await server.close();
  }
};

if (require.main === module) {
  startServer();
}

export { app, startServer, closeServer };
