import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./db/index.js";
import { Logger } from "./utils/logger.js";

dotenv.config({
  path: "./../.env",
});
export const logger = Logger();
connectDB()
  .then(() => {
    try {
      app.on("error", (error) => {
        throw error;
      });
      if (!process.env.TEST) {
        app.listen(process.env.PORT, () => {
          logger.info(`listening on port ${process.env.PORT}`);
        });
      }
    } catch (error) {
      logger.error("error while listening ", error);
    }
  })
  .catch((error) => {
    logger.error("error while connecting to db ", error);
  });