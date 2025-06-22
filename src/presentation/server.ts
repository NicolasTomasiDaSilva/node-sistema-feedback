import express from "express";
import cors from "cors";
import { json } from "body-parser";
import { router } from "./routes";

const app = express();

app.use(cors());
app.use(json());

app.use(router);

export { app };
