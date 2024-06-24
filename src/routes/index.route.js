
import express from "express";
import materialRouter from "./material.route.js";

const router = express.Router();

router.use("/materials", materialRouter)

export default router;