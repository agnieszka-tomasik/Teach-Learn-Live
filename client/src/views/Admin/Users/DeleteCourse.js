import React from 'react';
import axios from 'axios';
import "./CoursesAdmin.css"

const DeleteCourse = (props) => {

    const handleClick = () => {
        axios.post('/admin/courses/delete', {courseTitle:props.title})
            .then(response => {
                if (response.status === 200) {
                    props.courseListUpdate(response.data);
                } else {
                    console.log(`Delete Course fail ${response.data}`);
                }
            }).catch(e => {
                console.log(`Delete Course fail ${e}`);
            });
    }

    return (
        <button onClick={handleClick}>Remove</button>
    );

};

export default DeleteCourse;