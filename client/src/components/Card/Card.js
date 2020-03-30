import React from 'react';
import './Card.css';
import { addToCart } from '../../store/actions.js'
import { useDispatch } from 'react-redux';

function Card(course) {
    const dispatch = useDispatch();
    return (
        <div class="card-wrapper">
            <div class="card">
                <p class="card-header-title is-centered">{course.title}</p>
                <div class="card-content">
                    <div class="content-description">{course.description}</div>
                    <div class="content-traditional-seats">{course.traditional}</div>
                    <div class="content-online-seats">{course.online}</div>
                    <div class="content-schedule">{course.schedule}</div>
                    <button onClick={() => dispatch(addToCart(course.course_id))}>Add to cart</button>
                </div>
            </div>
        </div>
    )
}

export default Card;
