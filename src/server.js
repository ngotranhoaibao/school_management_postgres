import express from "express";
import userRouter from "./routes/user.route.js";
import dotenv from "dotenv";
import { env } from "prisma/config";
import schoolRouter from "./routes/school.route.js";
import swaggerSpec from "./swagger.js";
import swaggerUi from "swagger-ui-express";
dotenv.config();

const app = express();
const PORT = process.env.PORT;

// Middleware
app.use(express.json());

// Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use("/users", userRouter);
app.use("/school", schoolRouter);
// Khởi động Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
