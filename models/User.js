import { Schema, model } from "mongoose";
import Joi from "joi";
import gravatar from "gravatar";
// const email = "beer@gmail.com";
// const avatarUrl = gravatar.url(email);
// console.log(avatarUrl);
import { handleSaveError, addUpdateSettings } from "./hooks.js";

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.]?\w+)*(\.\w{2,3})+$/;
const generateAvatarUrl = function () {
  return gravatar.url(this.email);
};
const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: {
      type: String,
      default: null,
    },
    avatarURL: {
      type: String,
      default: generateAvatarUrl,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationCode: {
      type: String,
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleSaveError);
userSchema.pre("findOneAndUpdate", addUpdateSettings);
userSchema.post("findOneAndUpdate", handleSaveError);

//регистрация
export const userSignupShema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(4).required(),
});

//авторизация
export const userSigninShema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(4).required(),
});

//верификация
export const userEmailShema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
});

const User = model("user", userSchema);

export default User;
