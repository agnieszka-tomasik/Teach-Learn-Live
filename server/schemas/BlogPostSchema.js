const mongoose = require('mongoose');

const BlogPostSchema = new mongoose.Schema({
  authUname: { type: String, default: "Anonymous" },
  postTitle: { type: String, default: "No title." },
  postText: { type: String, required: true },
  postDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('blogPosts', BlogPostSchema);