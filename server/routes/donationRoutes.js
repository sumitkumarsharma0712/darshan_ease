import { Router } from "express";
import { auth, authorize } from "../middleware/auth.js";
import { donate, myDonations, all, stats } from "../controllers/donationController.js";

const router = Router();

router.post("/", auth, donate);
router.get("/me", auth, myDonations);
router.get("/stats", auth, authorize(["ADMIN"]), stats);
router.get("/", auth, authorize(["ADMIN"]), all);

export default router;
