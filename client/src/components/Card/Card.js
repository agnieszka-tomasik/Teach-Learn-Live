import React from 'react';
import './Card.css';

/* To connect with database??? Allowed with MERN stack?? */
/* Multi-part tutorial on shopping cart functionality:
https://medium.com/@ayabellazreg/make-a-simple-shopping-cart-app-using-react-redux-1-3-fefde93e80c7 */

function Card(course) {
    return (
        <div className="card-wrapper">
            <div className="card">
                <p className="card-header-title is-centered">{course.title}</p>
                <div className="card-content">
                    <div className="content-description">{course.description}</div>
                    <div className="content-traditional-seats">{course.traditional}</div>
                    <div className="content-online-seats">{course.online}</div>
                    <div className="content-schedule">{course.schedule}</div>
                    {/* // <button onClick={change style of button to embedded}>Add to cart</button>
                    // button or footer from card component??? dev choice */}
                    <button type="button">Add to cart</button>
                </div>
            </div>
        </div>
    );
}

export default Card;
