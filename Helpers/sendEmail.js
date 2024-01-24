import nodemailer from "nodemailer";
import { UKR_NET_PASSWORD, UKR_NET_FROM } from "../config.js";
// =====================================
//создание настроек
const nodemailerConfig = {
  //куда подключаемся
  host: "smtp.ukr.net",
  port: 2525, //25, 465
  secure: true,
  //к какому мылу подключаемся
  auth: {
    user: UKR_NET_FROM,
    pass: UKR_NET_PASSWORD,
  },
};

//транспорт будет слать сообщения
const transport = nodemailer.createTransport(nodemailerConfig);

// создаем письмо с 4 ключами
/*
    const data = {
      // from: UKR_NET_FROM,
      to: "mojakeh518@tsderp.com",
      subject: "MY topic",
      html: "<strong>MEOW</strong>",
    };
    */
const SendEmail = (data) => {
  const email = { ...data, from: UKR_NET_FROM };
  return transport.sendMail(email);
};

export default SendEmail;

// =====================================
