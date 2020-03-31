import React from 'react';
import axios from 'axios';
import "../Admin.css"

const DeleteEmail = (props) => {

    const handleClick = () => {
        axios.post('/admin/newsletter/delete', {id:props.id})
            .then(response => {
                if (response.status === 200) {
                    props.emailsUpdate(response.data);
                    props.setDelError(null);
                } else {
                    console.log(`Delete Email fail ${response.data}`);
                    props.setDelError(response.data)
                }
            }).catch(e => {
                console.log(`Delete Email fail ${e}`);
                props.setDelError("Delete Email fail");
            });
    }

    return (
        <button className='button' onClick={handleClick}>Remove</button>
    );

};

export default DeleteEmail;