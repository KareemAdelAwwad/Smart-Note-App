import cors from "cors";
import { config } from "dotenv";
import express from "express";
import { rateLimit } from "express-rate-limit";
import helmet from "helmet";
import { RedisClient } from "./config/indext.js";
import connectDB from "./db/connection.js";
import { controllerHandler } from "./utils/controllers-handler.js";
import { logger } from "./utils/logger.js";
config({ quiet: true });

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  standardHeaders: false, // Disable the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(limiter);
app.use(helmet({ contentSecurityPolicy: false, crossOriginEmbedderPolicy: false, crossOriginOpenerPolicy: false, crossOriginResourcePolicy: false, }));
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

