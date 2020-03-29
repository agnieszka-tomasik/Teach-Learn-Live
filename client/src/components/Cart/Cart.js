import React from 'react'
import { connect } from 'react-redux'
import { Courses } from '../../views/courses.js'
import { removeFromCart } from '../../store/actions.js'

function Cart(props) {
    let collection = props.addedCourses.map(course => {
        return (
            <div class="card-wrapper">
                <div class="card">
                    <div class="card-content">
                        <div class="content-course">{course.title}</div>
                        <div class="content-description">{course.description}</div>
                        <div class="content-price">{course.price}</div>
                        <button onClick={()=>{removeFromCart(course.course_id)}}>Remove from cart</button>
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

// takes the state in the reducer, passes addedCourses into props in the file
const mapState = (state) => {
    return {
        addedCourses: state.addedCourses
    }
}

// updates the reducer every time that the remove from cart button is pressed
const mapDispatch = (dispatch) => {
    return {
        removeFromCart: (id) => {dispatch(removeFromCart(id))}
    }
}

export default connect( mapState, mapDispatch )(Cart)
