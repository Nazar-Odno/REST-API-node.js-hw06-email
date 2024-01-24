import express from "express"; // работа с апи
import logger from "morgan"; //красиво логировать запрос
import cors from "cors"; // ошибка корс

import authRouter from "./routes/api/auth-router.js";
import contactsRouter from "./routes/api/contacts-router.js";

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
//создать мидлвару чтения файлов
app.use(express.static("public"));
//мидлвара для публичной роздачи - если придет запрос, срзу ищи в этой папке

app.use("/users", authRouter);
app.use("/api/contacts", contactsRouter);
// если прийдет любой запрос /api/contacts - ищи его в обьекте contactsRouter

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

export default app;

// import express from "express";
// import logger from "morgan";
// import cors from "cors";

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1OWMzZjNjNjljMzFlNzE4ODY1ODdjMiIsImlhdCI6MTcwNTIzNzYxNywiZXhwIjoxNzA1MzIwNDE3fQ.HS9nKFLwNPmkbKqNnS5nHauITKgpZaCE7qyi1DZCzsY

//api key elastic email
//3BD9E0BE1177CCB2D17A7CFB7118BBC53D4F0DF10C9F96A829834B988A8E53AFB27979779946A31B18A9E598C7AABB4B
