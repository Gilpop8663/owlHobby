import express from "express";
import {
  myPost,
  myProfile,
  profileDelete,
  profileEdit,
} from "../controllers/userController";

const userRotuer = express();

userRotuer.get("/:id([0-9a-f]{24})", myProfile);
userRotuer.get("/:id([0-9a-f]{24})/edit", profileEdit);
userRotuer.get("/:id([0-9a-f]{24})/delete", profileDelete);
userRotuer.get("/:id([0-9a-f]{24})/my-post", myPost);

export default userRotuer;
