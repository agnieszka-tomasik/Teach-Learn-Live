import React from 'react';
import './Card.css';

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
                    {/* // <button onClick={change style of button to embedded}>Add to cart</button>
                    // button or footer from card component??? dev choice */}
                    <button>Add to cart</button>
                </div>
            </div>
        </div>
    )
}

export default Card;
