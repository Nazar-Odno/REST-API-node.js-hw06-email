// группа маршрутов на авторизацию и регистрацию
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

//регистрация нового пользователя
authRouter.post(
  "/register",
  isEmptyBody,
  validateBody(userSignupShema),
  authController.signup
);

//логинизация
authRouter.post(
  "/login",
  isEmptyBody,
  validateBody(userSignupShema),
  authController.signin
);

//еще раз выслать верификацию
authRouter.post(
  "/verify",
  isEmptyBody,
  validateBody(userEmailShema),
  authController.resendVerifyEmail
);

//получение токена по запросу
authRouter.get("/current", authenticate, authController.GetCurrent);

//верификация
authRouter.get("/verify/:verificationCode", authController.verify);

//логаут
authRouter.post("/signout", authenticate, authController.signout);
export default authRouter;

//Изменение аватарки
authRouter.patch(
  "/avatars",
  upload.single("avatarURL"),
  authenticate,
  authController.ChangeAvatar
);
