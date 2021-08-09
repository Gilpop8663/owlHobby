import bcrypt from "bcrypt";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  gender: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  birthDate: { type: Date, required: true },
  location: { type: String, required: true },
  nickname: { type: String, unique: true, required: true },
  height: { type: String, required: true },
  bloodType: { type: String, required: true },
  religion: { type: String, required: true },
  smoking: { type: String, required: true },
  drinking: { type: String, required: true },
  job: { type: String, required: true },
  personality: { type: String, required: true },
  hobby: { type: String, required: true },
});

userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 5);
});

const User = mongoose.model("Users", userSchema);

export default User;
