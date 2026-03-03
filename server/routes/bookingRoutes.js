import { Router } from "express";
import { auth, authorize } from "../middleware/auth.js";
import { create, myBookings, cancel, all } from "../controllers/bookingController.js";

const router = Router();

router.post("/", auth, create);
router.get("/me", auth, myBookings);
router.delete("/:id", auth, cancel);
router.get("/", auth, authorize(["ADMIN"]), all);

export default router;
