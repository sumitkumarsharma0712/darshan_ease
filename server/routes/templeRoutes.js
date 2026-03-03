import { Router } from "express";
import { auth, authorize } from "../middleware/auth.js";
import { list, detail, create, update, remove } from "../controllers/templeController.js";

const router = Router();

router.get("/", list);
router.get("/:id", detail);
router.post("/", auth, authorize(["ADMIN"]), create);
router.put("/:id", auth, authorize(["ADMIN"]), update);
router.delete("/:id", auth, authorize(["ADMIN"]), remove);

export default router;
