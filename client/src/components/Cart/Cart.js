import React from 'react'
import Payment from './Payment.js'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromCart } from '../../store/cartSlice'

function Cart() {
    const addedCourses = useSelector(state => state.cart.courseList);
    const grandTotal = useSelector(state => state.cart.total);
    const dispatch = useDispatch();
    let collection = addedCourses.map(course => {
        return (
            <div className="card-wrapper">
                <div className="card">
                    <div className="card-content">
                        <div className="content-course">{course.title}</div>
                        <div className="content-description">{course.description}</div>
                        <div className="content-price">{course.price}</div>
                        <button onClick={()=>{dispatch(removeFromCart(course._id))}}>Remove from cart</button>
                    </div>
                </div>
            </div>
        )
    })
    let checkoutInfo = (addedCourses) => {
        return (
            <div className="card-wrapper">
                // on the checkout card, each course is mapped to a row =>
                // within the row the course title is placed on the left
                // column, course price is placed on the right

                // keep total, but courses and prices can be removed
                // if the information in the checkout box is redundant
                <div className="card"> {addedCourses.map(course => {
                    return (
                      <div className="card-row">
                          <div className="card-title-column">{course.title}</div>
                          <div className="card-price-column">{course.price}</div>
                      </div>
                    )
                })}
                <div className="grand-total">{grandTotal}</div>
                <button onClick={()=>{return(<Payment/>)}}>Checkout</button>
                </div>
            </div>
        )
    }
    return (
        <div className="container">
            <div className="cart">
                <ul className="displayedCourses">{collection}</ul>
                <div className="checkoutBox">{checkoutInfo}</div>
            </div>
        </div>
    )
}

export default Cart;
