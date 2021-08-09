import Post from "../models/Post";
import User from "../models/User";
import bcrypt from "bcrypt";

export const home = async (req, res) => {
  const posting = await Post.find({}).sort({ createdAt: "desc" });
  return res.render("home", { pageTitle: "우리의 취미", posting });
};
export const getJoin = (req, res) => {
  return res.render("join", { pageTitle: "회원가입" });
};
export const postJoin = async (req, res) => {
  const pageTitle = "회원가입";
  const {
    gender,
    email,
    password,
    password2,
    birthDate,
    location,
    nickname,
    height,
    bloodType,
    religion,
    smoking,
    drinking,
    job,
    personality,
    hobby,
  } = req.body;

  try {
    if (password !== password2) {
      return res.status(400).render("join", {
        pageTitle,
        errorMessage: "두 개의 비밀번호가 일치하지 않습니다",
      });
    }
    const exists = await User.exists({ $or: [{ email }, { nickname }] });
    if (exists) {
      return res.status(400).render("join", {
        pageTitle,
        errorMessage: "이미 이메일/닉네임을 가진 사람이 있습니다.",
      });
    }

    await User.create({
      gender,
      email,
      password,
      birthDate,
      location,
      nickname,
      height,
      bloodType,
      religion,
      smoking,
      drinking,
      job,
      personality,
      hobby,
    });
    return res.redirect("/login");
  } catch (error) {
    console.log(error);
    return res.status(400).render("join", {
      pageTitle,
      errorMessage: error._message,
    });
  }
};
export const getLogin = (req, res) =>
  res.render("login", { pageTitle: "로그인" });
export const postLogin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).render("login", {
      pageTitle: "로그인",
      errorMessage: "이메일이 존재하지 않습니다.",
    });
  }
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) {
    return res.status(400).render("login", {
      pageTitle: "로그인",
      errorMessage: "비밀번호가 틀렸습니다",
    });
  }
  req.session.loggedIn = true;
  req.session.user = user;
  return res.redirect("/");
};
export const myProfile = (req, res) => res.send("myProfile");
export const profileEdit = (req, res) => res.send("profileEdit");
export const profileDelete = (req, res) => res.send("profileDelete");
export const myPost = (req, res) => res.send("myPost");
