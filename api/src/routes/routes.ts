import express from "express";
import cors from "cors";
import { ListItems } from "../controllers/controller";
import type { Express } from "express";

const corsOptions = {
  origin: "http://localhost:5173",
  optionsSuccessStatus: 200,
};

const routes = (app:Express): void => {
    app.use(express.json());
    app.use(cors(corsOptions));
    app.get("/api/scrape", ListItems);
}

export default routes;