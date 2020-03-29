import React from 'react'
import './Courses.css'
import Card from '../../components/Card/Card.js'
import { connect } from 'react-redux'
import { addToCart } from '../../store/actions.js'

export function Courses(props) {
    return (
        <div class="container">
            <h1 class="title">Courses</h1>
            <div class="course-list">
                {/* Temporary, just to display the course info. */}
                {props.courses.map(Card)}
            </div>
        </div>
    )
}

// takes the state in the reducer and passes it as props to the file
const mapState = (state) => {
    return {
        courses: state.courses
    }
}

// An addToCart function (taking in the id of the targetted item as a parameter) was called from props.
// mapDispatchToCourses function connects the addToCart action to the reducer.
const mapDispatch = (dispatch) => {
    return {
        addToCart: (id) => {dispatch(addToCart(id))}
    }
}

// connects this Card component to the data in our store and passes in the two functions
export default connect( mapState, mapDispatch )(Courses)
