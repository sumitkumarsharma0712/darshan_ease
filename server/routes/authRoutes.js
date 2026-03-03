import { Router } from "express";
import { loginController, meController, registerController } from "../controllers/authController.js";
import { auth } from "../middleware/auth.js";

const router = Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.get("/me", auth, meController);

export default router;
