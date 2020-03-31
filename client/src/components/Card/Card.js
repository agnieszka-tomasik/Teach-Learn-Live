import React from 'react';
import './Card.css';
import { addToCart } from '../../store/cartSlice';
import { useDispatch } from 'react-redux'


function Card(course) {
    const dispatch = useDispatch();
    console.log(course);
    return (
        <div className="card-wrapper">
            <div className="card">
                <p className="card-header-title is-centered">{course.title}</p>
                <div className="card-content">
                    <div className="content-description">{course.description}</div>
                    <div className="content-traditional-seats">{course.traditional}</div>
                    <div className="content-online-seats">{course.online}</div>
                    <div className="content-schedule">{course.schedule}</div>
                    <button onClick={() => dispatch(addToCart(course))}>Add to cart</button>
                </div>
            </div>
        </div>
    )
}

export default Card;
