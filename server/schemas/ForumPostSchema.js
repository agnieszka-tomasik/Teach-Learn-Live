const mongoose = require('mongoose');

const ForumPostSchema = new mongoose.Schema({
  authUname: { type: String, required: true },
  postTitle: { type: String, default: "No title." },
  postText: { type: String, required: true },
  comments: { type: [ForumPostSchema], default: [] },
  postDate: { type: Date, default: Date.now }
});

export default mongoose.model('forumPosts', ForumPostSchema);