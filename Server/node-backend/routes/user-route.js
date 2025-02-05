import express from "express";
const router = express.Router();

import userController from "../controllers/user-controller.js";
import authUser from "../middlewares/user-auth.js";

router.post("/register", userController.register);
router.post("/login", userController.login);
router.patch("/reset-password", authUser, userController.resetPassword);
router.post("/send-otp", userController.sendOtpForPasswordChange);
router.patch("/forgot-password", userController.forgotPassword);

export default router;
