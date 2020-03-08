import React from 'react';
import Card from '../../components/Card/Card.js';
import './Courses.css';

const courses = [
    {
        course_id: 1,
        title: "Put class name here",
        description: "Put class description here",
        traditional: "Put remaining seat number here.",
        online: "Put remaining seat number here.",
        schedule: "Put date and time of class here."
    },
    {
        course_id: 2,
        title: "Put class name here",
        description: "Put class description here",
        traditional: "Put remaining seat number here.",
        online: "Put remaining seat number here.",
        schedule: "Put date and time of class here."
    }
];

function Courses(courses) {
    return (
      <div class="container">
          <h1 class="title">Courses</h1>
              <div class="course-list">
                  (courses) => {
                      courses.forEach({Card(course);})
                  };
              </div>
      </div>
    )
}

export default Courses;
