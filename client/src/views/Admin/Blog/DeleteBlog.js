import React from 'react';
import axios from 'axios';
import "../Admin.css"
import useToasts from '../../../components/Toasts';

const DeleteUser = (props) => {
    const {addError} = useToasts();

    const handleClick = (e) => {
        e.preventDefault();
        axios.post('/admin/blog/delete', {id:props.id})
            .then(response => {
                if (response.status === 200) {
                    props.postsUpdate(response.data);
                } else {
                    console.log(`Delete Blog Post fail ${response.data}`);
                    addError(response.data)
                }
            }).catch(e => {
                console.log(`Delete Blog Post fail ${e}`);
                addError("Delete Blog Post fail");

            });
    }

    return (
        <button className='button' onClick={handleClick}>Remove</button>
    );

};

export default DeleteUser;