import express from "express";
import 'express-async-errors';
import cors from "cors";
import dotenv from 'dotenv';

dotenv.config();

// Create express instance
const app = express();

// Require API routes
import routes from "./routes";
import AppError from "./errors/AppError"
import db from "./database";

// Import API Routes
app.use(cors());
app.use(express.json());
app.use(routes);

db.connect();

app.use([(err, request, response, next) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      message: err.message
    });
  }

  // Caso seja outro erro
  if (process.env.APP_DEBUG) {
    return response.status(500).json({
      status: "Error",
      message: err.message,
      stack: err.stack
    });
  } else {
    return response.status(500).json({
      status: "Error",
      message: `Internal server error ${err.message}`
    });
  }
}]);

export default app;
