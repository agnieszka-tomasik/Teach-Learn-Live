const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
  courseTitle: { type: String, required: true },
  courseDesc: { type: String, default: "No description." },
  postDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('courses', CourseSchema);