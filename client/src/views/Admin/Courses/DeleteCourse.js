import React from 'react';
import axios from 'axios';
import "../Admin.css"

const DeleteCourse = (props) => {

    const handleClick = () => {
        axios.post('/admin/courses/delete', {title:props.title})
            .then(response => {
                if (response.status === 200) {
                    props.courseListUpdate(response.data);
                    props.setDelError(null);
                } else {
                    console.log(`Delete Course fail ${response.data}`);
                    props.setDelError(response.data)
                }
            }).catch(e => {
                console.log(`Delete Course fail ${e}`);
                props.setDelError("Delete Course fail");
            });
    }

    return (
        <button className='button' onClick={handleClick}>Remove</button>
    );

};

export default DeleteCourse;