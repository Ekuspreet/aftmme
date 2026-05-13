import express from "express";
import { PAGES_ARRAY } from "../constants.js";
import webController from "../controllers/web.js";

const webRouter = express.Router();

PAGES_ARRAY.forEach(({ path, name }) => {
  webRouter.get(path, webController[name]);
});

export default webRouter;
