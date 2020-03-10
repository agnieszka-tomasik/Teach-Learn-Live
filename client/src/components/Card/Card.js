import React from 'react';
import './Card.css';

{/* add a selected course to cart */}
handleAdd = (id)=>{
    this.props.add(id);
}

{/* To connect with database??? Allowed with MERN stack?? */}
{/* Multi-part tutorial on shopping cart functionality:
  https://medium.com/@ayabellazreg/make-a-simple-shopping-cart-app-using-react-redux-1-3-fefde93e80c7 */}
import { connect } from 'react-redux'

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
<<<<<<< HEAD
                    {/* handle a button click */}
                    <button onClick={()=>{this.handleAdd(item.id)>Add to cart</button>
=======
                    {/* // <button onClick={change style of button to embedded}>Add to cart</button>
                    // button or footer from card component??? dev choice */}
                    <button>Add to cart</button>
>>>>>>> 8aced52fb88557e3bede82b087a6307f899bd921
                </div>
            </div>
        </div>
    )
}

export default Card;

const mapStateToProps = (state)=>{
    return{course: state.addedCourse}
}
const mapDispatchToProps = (dispatch)=>{
    return{add: (id)=>{dispatch(add(id))}}
}
export default connect(mapStateToProps,mapDispatchToProps)(Cart)
