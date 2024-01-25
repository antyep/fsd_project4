import express from "express";
import { AppointmentController } from "../controllers/AppointmentController";
import { auth } from "../middlewares/auth";

const router = express.Router();
const appointmentController = new AppointmentController();

router.post("/", auth, appointmentController.create);

router.get("/", auth, appointmentController.getUserAppointments)
router.get("/artist", auth, appointmentController.getArtistAppointments);

router.get("/:id", auth, appointmentController.getById);

router.put("/:id", auth, appointmentController.update);
router.delete("/:id", auth, appointmentController.delete);

export default router;
