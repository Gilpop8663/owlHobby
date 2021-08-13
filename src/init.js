import "dotenv/config";
import "./db";
import "./models/Post";
import app from "./server";

const PORT = 4000;

const handleServerOpen = console.log(
  "✅ 서버가 포트 4000에 정상적으로 열렸습니다.🎐"
);

app.listen(PORT, handleServerOpen);
