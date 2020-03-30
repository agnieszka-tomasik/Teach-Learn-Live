import React from 'react';
import Card from '../../components/Card/Card.js';
import './Courses.css';
import Payment from './Payment'

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

function Courses(props) {
    return (
        <div class="container">
            <h1 class="title">Courses</h1>
            <div class="course-list">
                {/* Temporary, just to display the course info. */}
                {courses.map(Card)}
            </div>
            <div>
                <Payment/>
            </div>
        </div>
    )
}

export default Courses;
