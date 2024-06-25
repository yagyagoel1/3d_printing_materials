import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";
import { logger } from "../index.js";

const connectDB = async () => {
  try {
    let db = DB_NAME;
    if (process.env.TEST) {
      db = "test";
    }
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URL}${db}`
    );
    logger.info(
      `\n MongoDB connected DB HOST : ${connectionInstance.connection.host}`
    );
  } catch (error) {
    logger.info("monogodb connection failed", error);
    process.exit(1);
  }
};
export default connectDB;
