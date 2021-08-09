import express, { urlencoded } from "express";
import morgan from "morgan";
import globalRouter from "./router/globalRouter";
import postingRouter from "./router/postingRouter";
import userRotuer from "./router/userRouter";
import session from "express-session";
import { localsMiddleware } from "./middlewares";

const app = express();
const logger = morgan("dev");

app.set("view engine", "pug");

app.set("views", process.cwd() + "/src/views");

app.use(logger);
app.use(urlencoded({ extended: true }));

app.use(
  session({
    secret: "Hello!",
    resave: true,
    saveUninitialized: true,
  })
);

app.use((req, res, next) => {
  req.sessionStore.all((error, sessions) => {
    next();
  });
});

app.use(localsMiddleware);

app.use("/", globalRouter);
app.use("/posting", postingRouter);
app.use("/user", userRotuer);

export default app;
