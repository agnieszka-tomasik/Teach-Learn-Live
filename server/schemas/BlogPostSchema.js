import mongoose from 'mongoose';

const BlogPostSchema = new mongoose.Schema({
  authUname: { type: String, required: true },
  postTitle: { type: String, default: "No title." },
  postText: { type: String, required: true },
  postDate: { type: Date, default: Date.now }
});

export default mongoose.model('blogPosts', BlogPostSchema);