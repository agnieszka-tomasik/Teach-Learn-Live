import React from 'react';
import './Card.css';
import { connect } from 'react-redux'
import { addToCart } from '../../store/actions.js'

function Card(course) {
    return (
        <div class="card-wrapper">
            <div class="card">
                <p class="card-header-title is-centered">{course.title}</p>
                <div class="card-content">
                    <div class="content-description">{course.description}</div>
                    <div class="content-traditional-seats">{course.traditional}</div>
                    <div class="content-online-seats">{course.online}</div>
                    <div class="content-schedule">{course.schedule}</div>
                    <button onClick={()=>{addToCart(course.course_id)}}>Add to cart</button>
                </div>
            </div>
        </div>
    )
}

export default Card;
