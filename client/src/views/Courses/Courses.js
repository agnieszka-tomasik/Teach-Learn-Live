import React from 'react'
import './Courses.css'
import Card from '../../components/Card/Card.js'
import { connect } from 'react-redux'

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

// connects this Card component to the data in our store and passes in the two functions
export default connect( mapState)(Courses)
