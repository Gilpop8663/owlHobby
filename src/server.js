import express from "express";
import morgan from "morgan";
import globalRouter from "./router/globalRouter";
import postingRouter from "./router/postingRouter";
import userRotuer from "./router/userRouter";

const PORT = 4000;

const app = express();
const logger = morgan("dev");

const handleServerOpen = console.log(
  "서버가 포트 4000에 정상적으로 열렸습니다.🎐"
);

app.use(logger);

app.use("/", globalRouter);
app.use("/posting", postingRouter);
app.use("/user", userRotuer);

app.listen(PORT, handleServerOpen);
