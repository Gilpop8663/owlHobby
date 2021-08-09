import Post from "../models/Post";

export const watchPost = async (req, res) => {
  const { id } = req.params;
  const post = await Post.findById(id);
  if (!post) {
    return res.status(404).render("404", { pageTitle: "Error", post });
  }
  return res.render("watchpost", { pageTitle: post.title, post });
};

export const getPostingEdit = async (req, res) => {
  const { id } = req.params;
  const post = await Post.findById(id);
  if (!post) {
    return res.status(404).render("404", { pageTitle: "Error", post });
  }
  return res.render("postedit", {
    pageTitle: "게시글 수정하기",
    post,
  });
};
export const postPostingEdit = async (req, res) => {
  const { id } = req.params;
  console.log(req.body);
  const { title, location, meetTime, requirements } = req.body;
  try {
    const post = await Post.exists({ _id: id });
    if (!post) {
      return res.status(404).render("404", { pageTitle: "Error", post });
    }
    await Post.findByIdAndUpdate(id, {
      title,
      location,
      meetTime,
      requirements,
    });
    return res.redirect(`/posting/${id}`);
  } catch (error) {
    console.log(error);
    return res.status(404).redirect(`/posting/${id}/edit`);
  }
};

export const postDelete = async (req, res) => {
  const { id } = req.params;
  await Post.findByIdAndDelete(id);
  return res.redirect("/");
};
export const commentCreate = (req, res) => res.send("commentCreate");
export const commentEdit = (req, res) => res.send("commentEdit");
export const commentDelete = (req, res) => res.send("commentDelete");
export const getPostingUpload = (req, res) => {
  return res.render("postupload", {
    pageTitle: "게시글 올리기",
  });
};
export const postPostingUpload = async (req, res) => {
  const { title, location, meetTime, requirements } = req.body;
  try {
    await Post.create({
      title,
      location,
      meetTime,
      requirements,
    });
    return res.redirect("/");
  } catch (error) {
    console.log(error);
    return res.status(404).render("postupload", {
      pageTitle: "게시글 올리기",
      errorMessage: error._message,
    });
  }
};

export const postSearch = async (req, res) => {
  console.log(req.query);
  const { keyword } = req.query;
  let post = [];
  if (keyword) {
    post = await Post.find({
      title: { $regex: new RegExp(`${keyword}`, "i") },
      title: { $in: new RegExp(`${keyword}`, "i") },
    });
  }
  return res.render("postserach", { pageTitle: "검색하기", post });
};
