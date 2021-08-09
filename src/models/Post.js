import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxLength: 100 },
  location: { type: String, required: true, trim: true, maxLength: 100 },
  meetTime: { type: String, required: true, trim: true, maxLength: 100 },
  requirements: { type: String, required: true, trim: true, maxLength: 200 },
  createdAt: { type: Date, required: true, default: Date.now },
  comments: { type: Number, required: true, default: 0 },
  meta: {
    views: { type: Number, required: true, default: 0 },
    like: { type: Number, required: true, default: 0 },
  },
});

const Post = mongoose.model("Posts", postSchema);

export default Post;
