import express from "express";
import userRoutes from "./routes/users.routes";
import authRoutes from "./routes/auth.routes";

const router = express.Router();

router.use("/api/auth", authRoutes);
router.use("/api/admin/users", userRoutes);

export default router;
