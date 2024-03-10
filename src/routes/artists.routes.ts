import express from "express";
import { ArtistController } from "../controllers/ArtistController";
import { auth } from "../middlewares/auth";
import { isAdmin } from "../middlewares/isAdmin";

// -----------------------------------------------------------------------------

const router = express.Router();
const artistController = new ArtistController();

router.get("/", artistController.getAll);

router.get("/:id", artistController.getById);

router.post("/", auth, isAdmin, artistController.create);

router.patch("/:id", auth, isAdmin, artistController.update);

router.delete("/:id", auth, isAdmin, artistController.delete);

export default router;
