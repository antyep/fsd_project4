import express from "express";
import userRoutes from "./routes/users.routes";
import authRoutes from "./routes/auth.routes";
import appointments from "./routes/appointments.routes";
import artists from "./routes/artists.routes";

const router = express.Router();

router.use("/api/auth", authRoutes);
router.use("/api/users", userRoutes);
router.use("/api/appointments", appointments);
router.use("/api/artists", artists);

export default router;
