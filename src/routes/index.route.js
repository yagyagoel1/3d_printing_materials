import express from "express";
import materialRouter from "./material.route.js";
import metricsRouter from "./metrics.route.js";
const router = express.Router();

router.use("/materials", materialRouter);
router.use("/metrics", metricsRouter);
export default router;
