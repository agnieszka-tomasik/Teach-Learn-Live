import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromCart } from '../../store/cartSlice'
import Courses from '../../views/Courses/Courses.js';
import {Link} from 'react-router-dom'
import Payment from './Payment';

function money_round(num) {
    return Math.ceil(num * 100) / 100;
}
function Cart() {
    const addedCourses = useSelector(state => state.cart.courseList);
    const grandTotal = useSelector(state => state.cart.total);
    const dispatch = useDispatch();
    let collection = addedCourses.map(course => {
        return (
            <div style={{background:"white", padding:"1rem"}}>
                <div className="title is-6">{course.title}</div>
                <div>{course.description}</div>
                <div>${course.price}</div>
                    <button onClick={() => { dispatch(removeFromCart(course._id)) }}>Remove from cart</button>
            </div>
        )
    })
    return (
        <div className="container">
            <div className="cart">
                <ul className="displayedCourses">{collection}</ul>
                <div className="checkoutBox">
                    <Payment/>
                </div>
            </div>
        </div>
    )
}

export default Cart;
