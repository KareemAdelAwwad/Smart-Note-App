import { config } from "dotenv";
import { createClient } from "redis";
import { logger } from "../utils/logger.js";

// Load environment variables
config({quiet: true});

const redisConfig = {
  url: process.env.REDIS_URL || `redis://:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`
};

export const RedisClient = createClient(redisConfig);

RedisClient.on("error", (err) => {
  logger.error(err, "Redis Client Error");
});
RedisClient.on("connect", () => {
  logger.info("Connected to Redis");
});
RedisClient.on("end", () => {
  logger.info("Disconnected from Redis");
});