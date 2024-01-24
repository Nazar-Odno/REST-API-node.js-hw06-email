import mongoose from "mongoose";

import app from "./app.js";

import { DB_HOST } from "./config.js";
// import { sendEmail } from "./Helpers/sendEmail.js";

// import nodemailer from "nodemailer";
// import { UKR_NET_PASSWORD, UKR_NET_FROM } from "./config.js";
// const {DB_HOST, PORT = 3000} = process.env;
// import "dotenv/config";

mongoose
  .connect(DB_HOST)
  .then(() => {
    // console.log(sendEmail);
    app.listen(3000, () => {
      console.log("Database connection successful :)");
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
