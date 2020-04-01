import React from 'react';
import Card from '../../components/Card/Card.js';
import CartComponent from '../../components/Cart/Cart'
import './Courses.css';
import { WithBanner } from '../../components/Banner/index.js';
import { Route, Switch, Link } from 'react-router-dom';
import { useSelector } from 'react-redux'

function NavButtons() {
    return <div className="buttons">
        <Link className="button" to="/courses/cart">My Cart</Link>
        <Link className="button" to="/courses/">Courses</Link>
    </div>
}

function CourseHomePage() {
    const available = useSelector(state => state.course.availableCourses);
    const cart = useSelector(state => state.cart.courseList);
    if(!available) {
        return <>Loading</>
    }
    const courses = available.filter(c => !cart.includes(c));
    return <div>
        <NavButtons />
        <div className="course-list">
            {/* Temporary, just to display the course info. */}
            {courses.map(Card)}
        </div>
    </div>
}

function Cart() {
    return <div>
        <NavButtons />
        <CartComponent />
    </div>;
}

function Courses(props) {
    return (
        <div className="container">
            <h1 className="title">Courses</h1>
            <Switch>
                <Route exact path="/courses/"
                    render={(props) => <CourseHomePage {...props} />} />
                <Route path="/courses/cart" component={Cart} />
            </Switch>
        </div>
    )
}

// connects this Card component to the data in our store and passes in the two functions
export default WithBanner(Courses);
