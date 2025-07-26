import cors from "cors";
import { config } from "dotenv";
import express from "express";
import helmet from "helmet";
import { RedisClient } from "./config/indext.js";
import connectDB from "./db/connection.js";
import { controllerHandler } from "./utils/controllers-handler.js";
import { logger } from "./utils/logger.js";
config({ quiet: true });

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(helmet());
app.use(cors());
controllerHandler(app, express);
RedisClient.connect();
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      logger.info(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    logger.error(error, "Database connection failed");
  });

