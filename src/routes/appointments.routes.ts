import express from "express";
import { AppointmentController } from "../controllers/AppointmentController";
import { auth } from "../middlewares/auth";

const router = express.Router();
const appointmentController = new AppointmentController();

router.post("/", auth, appointmentController.create);
router.get("/myappointments", auth, appointmentController.getByUserId);
// ruta update
// ruta delete

export default router;