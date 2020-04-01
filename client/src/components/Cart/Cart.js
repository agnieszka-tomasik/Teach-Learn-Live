import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromCart } from '../../store/cartSlice'

function Cart() {
    const addedCourses = useSelector(state => state.cart.courseList);
    const dispatch = useDispatch();
    let collection = addedCourses.map(course => {
        return (
            <div className="card-wrapper">
                <div className="card">
                    <div className="card-content">
                        <div className="content-course">{course.title}</div>
                        <div className="content-description">{course.description}</div>
                        <div className="content-price">{course.price}</div>
                        <button onClick={()=>{dispatch(removeFromCart(course.course_id))}}>Remove from cart</button>
                    </div>
                </div>
            </div>
        )
    })
    return (
        <div className="container">
            <div className="cart">
                <ul className="displayedCourses">{collection}</ul>
            </div>
        </div>
    )
}

// updates the reducer every time that the remove from cart button is pressed

export default Cart;
