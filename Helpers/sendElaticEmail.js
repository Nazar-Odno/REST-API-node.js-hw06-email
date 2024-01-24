//EXAMPLE
import ElasticEmail from "@elasticemail/elasticemail-client";

import { ELASTICEMAIL_API_KEY, ELASTICEMAIL_FROM } from "./config.js";
//создаем обьект чтобы отправлять с него потом
const defaultClient = ElasticEmail.ApiClient.instance;
//потом с него берем апикей
const { apikey } = defaultClient.authentications;
apikey.apiKey = ELASTICEMAIL_API_KEY;

//создаем обьект который будет отправлять емеил
const api = new ElasticEmail.EmailsApi();

//создаем емеил
const email = ElasticEmail.EmailMessageData.constructFromObject({
  //временный емеил для теста
  Recipients: [new ElasticEmail.EmailRecipient("mojakeh518@tsderp.com")],
  Content: {
    Body: [
      ElasticEmail.BodyPart.constructFromObject({
        ContentType: "HTML",
        Content: "<strong>Meow-Meow</strong>",
      }),
    ],
    Subject: "test",
    //от кого
    From: ELASTICEMAIL_FROM,
  },
});

const callback = function (error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log("API called successfully.");
  }
};
//отправлям емеил
const sendMyMail = api.emailsPost(email, callback);
