import "reflect-metadata";

import express from "express";

import "./database/connect";
import routes from "./routes";

const app = express();

app.use(express.json());
app.use(routes);

app.listen(3333, () =>
  console.log("Server rodando na porta http://localhost:3333 🚀")
);
