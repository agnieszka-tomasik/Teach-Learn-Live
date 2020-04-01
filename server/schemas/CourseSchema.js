const mongoose = require('mongoose');

// <p className="card-header-title is-centered">{course.title}</p>
// <div className="card-content">
//     <div className="content-description">{course.description}</div>
//     <div className="content-traditional-seats">{course.traditional}</div>
//     <div className="content-online-seats">{course.online}</div>
//     <div className="content-schedule">{course.schedule}</div>
const CourseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, default: "No description." },
    seats: { type: Number, default: 5 },
    price: { type: Number, default: 100 },
    schedule: { type: String, default: "M W F" },
    postDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('courses', CourseSchema);