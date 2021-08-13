import mongoose, { mongo } from "mongoose";

mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const db = mongoose.connection;

const handleOpen = () =>
  console.log("✅ 데이터베이스에 정상적으로 연결되었습니다.🎐");

const handleError = (error) =>
  console.log("❌ 데이터베이스에 오류가 났습니다.", error);

db.on("error", handleError);

db.once("open", handleOpen);
