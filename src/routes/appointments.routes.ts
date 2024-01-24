import express from "express";
import { AppointmentController } from "../controllers/AppointmentController";
import { auth } from "../middlewares/auth";

const router = express.Router();
const appointmentController = new AppointmentController();

router.post("/", auth, appointmentController.create);
router.delete("/:id", auth, appointmentController.delete);
router.put("/:id", auth, appointmentController.update);

// @todo: fix this routes behaviour. also add one for artist
router.get("/myappointments", auth, appointmentController.getByUserId);

export default router;
