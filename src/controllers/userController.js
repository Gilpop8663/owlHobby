import Post from "../models/Post";
import User from "../models/User";
import bcrypt from "bcrypt";
import fetch from "node-fetch";

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

// https://kauth.kakao.com/oauth/authorize?response_type=code&client_id={REST_API_KEY}&redirect_uri={REDIRECT_URI}
export const kakaoLoginStart = (req, res) => {
  const baseUrl = "https://kauth.kakao.com/oauth/authorize";
  const redirectUrl = "http://localhost:4000/user/auth/callback";
  const config = {
    response_type: "code",
    client_id: process.env.KAKAO_REST_API,
    redirect_uri: "",
  };
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}${redirectUrl}`;
  console.log(finalUrl);
  return res.redirect(finalUrl);
};

export const kaKaoLoginFinish = async (req, res) => {
  const baseUrl = "https://kauth.kakao.com/oauth/token";
  const { code } = req.query;
  const config = {
    grant_type: "authorization_code",
    client_id: process.env.KAKAO_REST_API,
    redirect_uri: process.env.KAKAO_REDIRECT,
    code,
    client_secret: process.env.KAKAO_SECRET,
  };
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`;
  const tokenRequest = await (
    await fetch(finalUrl, {
      method: "POST",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
    })
  ).json();
  if ("access_token" in tokenRequest) {
    const { access_token } = tokenRequest;
    const userRequest = await (
      await fetch("https://kapi.kakao.com/v2/user/me", {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
        Parameter: {
          property_keys: ["kakao_account.email"],
        },
      })
    ).json();
    console.log(userRequest);
    const { is_email_valid, is_email_verified } = userRequest.kakao_account;
    if (is_email_valid === true && is_email_verified === true) {
      const existingUser = await User.findOne({
        email: userRequest.kakao_account.email,
      });
      console.log("같은이메일이 존재하는가?" + existingUser);
      if (existingUser) {
        req.session.loggedIn = true;
        req.session.user = existingUser;
        console.log("기존 이메일로 로그인되었습니다." + existingUser);
        return res.redirect("/");
      } else {
        const user = await User.create({
          gender: userRequest.kakao_account.gender,
          email: userRequest.kakao_account.email,
          socialOnly: true,
          password: "",
          nickname: userRequest.properties.nickname,
        });
        req.session.loggedIn = true;
        req.session.user = user;
        console.log("유저가 생성되었습니다." + user);
        return res.redirect("/");
      }
    } else {
      res.redirect("/login");
    }
  } else {
    return res.redirect("/login");
  }
};

export const logout = (req, res) => {
  req.session.destroy();
  return res.redirect("/");
};
