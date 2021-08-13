import bcrypt from "bcrypt";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  gender: { type: String, required: true },
  socialOnly: { type: Boolean, default: false },
  email: { type: String, unique: true, required: true },
  password: { type: String },
  birthDate: { type: Date },
  location: { type: String },
  nickname: { type: String, unique: true, required: true },
  height: { type: String },
  bloodType: { type: String },
  religion: { type: String },
  smoking: { type: String },
  drinking: { type: String },
  job: { type: String },
  personality: { type: String },
  hobby: { type: String },
});

userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 5);
});

const User = mongoose.model("Users", userSchema);

export default User;
