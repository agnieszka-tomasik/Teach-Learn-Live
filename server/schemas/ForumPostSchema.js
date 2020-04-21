const mongoose = require('mongoose');

const ForumPostSchema = new mongoose.Schema({
  authUname: { type: String, required: true },
  postTitle: { type: String, default: "No title." },
  postText: { type: String, required: true },
  postDate: { type: Date, default: Date.now },
  blacklist: { type: [String], default: [] }
});
ForumPostSchema.add({comments: { type: [ForumPostSchema], default: [] }});
module.exports = mongoose.model('forumPosts', ForumPostSchema);