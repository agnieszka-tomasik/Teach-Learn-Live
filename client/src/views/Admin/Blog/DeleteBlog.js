import React from 'react';
import axios from 'axios';
import "../Admin.css"

const DeleteUser = (props) => {

    const handleClick = () => {
        axios.post('/admin/blog/delete', {id:props.id})
            .then(response => {
                if (response.status === 200) {
                    props.postsUpdate(response.data);
                    props.setDelError(null);
                } else {
                    console.log(`Delete Blog Post fail ${response.data}`);
                    props.setDelError(response.data)
                }
            }).catch(e => {
                console.log(`Delete Blog Post fail ${e}`);
                props.setDelError("Delete Blog Post fail");
            });
    }

    return (
        <button className='button' onClick={handleClick}>Remove</button>
    );

};

export default DeleteUser;