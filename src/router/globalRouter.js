import express from "express";
import { postSearch } from "../controllers/postingController";
import {
  getJoin,
  getLogin,
  home,
  postJoin,
  postLogin,
} from "../controllers/userController";

const globalRouter = express();

globalRouter.get("/", home);
globalRouter.route("/login").get(getLogin).post(postLogin);
globalRouter.route("/join").get(getJoin).post(postJoin);
globalRouter.get("/search", postSearch);

export default globalRouter;
