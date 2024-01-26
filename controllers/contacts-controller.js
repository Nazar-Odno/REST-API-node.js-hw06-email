// import fs from "fs/promises";
// import path from "path";
import { HttpError } from "../Helpers/index.js";
import { ctrlWrapper } from "../decorators/index.js";

import Contact from "../models/Contact.js";

import {
  contactAddSchema,
  contactUpdateSchema,
  contactUpdateFavoriteShema,
} from "../models/Contact.js";
// const avatarPath = path.resolve("public", "avatars");

const getAll = async (req, res) => {
  //запрос за контактами только этого пользователя
  const { _id: owner } = req.user;
  const { page = 1, limit = 10 } = req.params;
  const result = await Contact.find({ owner });
  res.json(result);
};

const getById = async (req, res) => {
  /*
    console.log(req.params); достучаться
    до ключа - contactId: 'vza2RIzNGIwutCVCs4mCL'
  */
  const { contactId } = req.params;
  const result = await Contact.findById(contactId);
  if (!result) {
    throw HttpError(404, `Not found`);
  }
  return res.json(result);
};

const add = async (req, res) => {
  const { _id: owner } = req.user;
  const { error } = contactAddSchema.validate(req.body);
  if (error) {
    throw HttpError(400, error.message);
  }
  const result = await Contact.create({ ...req.body, owner });
  res.status(201).json(result);
};

const updateById = async (req, res) => {
  const { error } = contactUpdateSchema.validate(req.body);
  if (error) {
    console.log(error);
    throw HttpError(404, "Not found");
  }
  const { contactId } = req.params;
  console.log(contactId);
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
    runValidators: true,
  });
  if (!result) {
    throw HttpError(404, `Not found`);
  }
  res.json(result);
};

const deleteById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndDelete({
    _id: contactId,
    owner: _id,
  });
  if (!result) {
    throw HttpError(404, `Not found`);
  }
  res.json({
    message: "contact deleted",
  });
};

export default {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  updateById: ctrlWrapper(updateById),
  deleteById: ctrlWrapper(deleteById),
};
