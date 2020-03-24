import React from 'react';
import Card from '../../components/Card/Card.js';
import './Courses.css';
import { WithBanner } from '../../components/Banner/index.js';
import { Route, Switch, Link } from 'react-router-dom';

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

function NavButtons() {
    return <div class="buttons">
        <Link className="button" to="/courses/cart">My Cart</Link>
        <Link className="button" to="/courses/">Courses</Link>
    </div>
}

function CourseHomePage(props) {
    return <div>
        <NavButtons />
        <div class="course-list">
            {/* Temporary, just to display the course info. */}
            {courses.map(Card)}
        </div>
    </div>
}

function Cart(props) {
    return <div>
        <NavButtons />
    Cart here
    </div>;
}

function Courses(props) {
    return (
        <div class="container">
            <h1 class="title">Courses</h1>
            <Switch>
                <Route exact path="/courses/" component={CourseHomePage} />
                <Route path="/courses/cart" component={Cart} />
            </Switch>
        </div>
    )
    return (
        <div class="container">
        </div>
    )
}

export default WithBanner(Courses);
