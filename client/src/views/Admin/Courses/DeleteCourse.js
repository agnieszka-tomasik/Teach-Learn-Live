import React from 'react';
import axios from 'axios';
import "../Admin.css"
import useToasts from '../../../components/Toasts';

const DeleteCourse = (props) => {
    const { addError } = useToasts();

    const handleClick = (e) => {
        e.preventDefault();
        axios.post('/admin/courses/delete', { title: props.title })
            .then(response => {
                if (response.status === 200) {
                    props.courseListUpdate(response.data);

                } else {
                    console.log(`Delete Course fail ${response.data}`);
                    addError(response.data)
                }
            }).catch(e => {
                console.log(`Delete Course fail ${e}`);
                addError("Delete Course fail");
            });
    }

    return (
        <button className='button' onClick={handleClick}>Remove</button>
    );

};

export default DeleteCourse;