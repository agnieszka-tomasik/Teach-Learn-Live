import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import Card from '../../components/Card/Card';
import './Courses.css';
import { WithBanner } from '../../components/Banner';

const courses = [
    {
        course_id: 1,
        title: 'Put class name here',
        description: 'Put class description here',
        traditional: 'Put remaining seat number here.',
        online: 'Put remaining seat number here.',
        schedule: 'Put date and time of class here.',
    },
    {
        course_id: 2,
        title: 'Put class name here',
        description: 'Put class description here',
        traditional: 'Put remaining seat number here.',
        online: 'Put remaining seat number here.',
        schedule: 'Put date and time of class here.',
    },
];

function NavButtons() {
    return (
        <div className="buttons">
            <Link className="button" to="/courses/cart">My Cart</Link>
            <Link className="button" to="/courses/">Courses</Link>
        </div>
    );
}

function CourseHomePage() {
    return (
        <div>
            <NavButtons />
            <div className="course-list">
                {/* Temporary, just to display the course info. */}
                {courses.map(Card)}
            </div>
        </div>
    );
}

function Cart() {
    return (
        <div>
            <NavButtons />
            Cart here
        </div>
    );
}

function Courses() {
    return (
        <div className="container">
            <h1 className="title">Courses</h1>
            <Switch>
                <Route exact path="/courses/" component={CourseHomePage} />
                <Route path="/courses/cart" component={Cart} />
            </Switch>
        </div>
    );
}

export default WithBanner(Courses);
