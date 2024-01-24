import express from "express";

import authController from "../../controllers/auth-controller.js";
import { upload } from "../../middlewares/upload.js";
import {
  isEmptyBody,
  isEmptyBodyPatch,
  isEmptyBodyPut,
} from "../../middlewares/isEmptyBody.js";

import { authenticate } from "../../middlewares/authenticate.js";

import { validateBody } from "../../decorators/index.js";

import {
  userSigninShema,
  userSignupShema,
  userEmailShema,
} from "../../models/User.js";

const authRouter = express.Router();

authRouter.post(
  "/register",
  isEmptyBody,
  validateBody(userSignupShema),
  authController.signup
);

authRouter.post(
  "/login",
  isEmptyBody,
  validateBody(userSignupShema),
  authController.signin
);

authRouter.post(
  "/verify",
  isEmptyBody,
  validateBody(userEmailShema),
  authController.resendVerifyEmail
);

authRouter.get("/current", authenticate, authController.GetCurrent);

authRouter.get("/verify/:verificationCode", authController.verify);

authRouter.post("/signout", authenticate, authController.signout);
export default authRouter;

authRouter.patch(
  "/avatars",
  upload.single("avatarURL"),
  authenticate,
  authController.ChangeAvatar
);
