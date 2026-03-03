import { Router } from "express";
import { auth, authorize } from "../middleware/auth.js";
import { listByTemple, create, update, remove } from "../controllers/slotController.js";

const router = Router();

router.get("/temple/:templeId", listByTemple);
router.post("/", auth, authorize(["ADMIN", "ORGANIZER"]), create);
router.put("/:id", auth, authorize(["ADMIN", "ORGANIZER"]), update);
router.delete("/:id", auth, authorize(["ADMIN", "ORGANIZER"]), remove);

export default router;
