import React from 'react';
import Card from '../../components/Card/Card.js';
import CartComponent from '../../components/Cart/Cart'
import './Courses.css';
import { WithBanner } from '../../components/Banner/index.js';
import { Route, Switch, Link } from 'react-router-dom';
import { connect } from 'react-redux'

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
        <CartComponent/>
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
}

// takes the state in the reducer and passes it as props to the file
const mapState = (state) => {
    return {
        courses: state.courses
    }
}

// connects this Card component to the data in our store and passes in the two functions
export default WithBanner(connect(mapState)(Courses))
