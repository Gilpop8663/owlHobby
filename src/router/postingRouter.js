import express from "express";
import {
  getPostingEdit,
  postDelete,
  postPostingEdit,
  watchPost,
  postPostingUpload,
  getPostingUpload,
} from "../controllers/postingController";

const postingRouter = express();

postingRouter.route("/upload").get(getPostingUpload).post(postPostingUpload);
postingRouter.get("/:id([0-9a-f]{24})", watchPost);
postingRouter
  .route("/:id([0-9a-f]{24})/edit")
  .get(getPostingEdit)
  .post(postPostingEdit);
postingRouter.get("/:id([0-9a-f]{24})/delete", postDelete);

export default postingRouter;
