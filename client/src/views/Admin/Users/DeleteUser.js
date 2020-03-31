import React from 'react';
import axios from 'axios';
import "../Admin.css"

const DeleteUser = (props) => {

    const handleClick = () => {
        axios.post('/admin/users/delete', {uname:props.uname})
            .then(response => {
                if (response.status === 200) {
                    props.usersUpdate(response.data);
                    props.setDelError(null);
                } else {
                    console.log(`Delete User fail ${response.data}`);
                    props.setDelError(response.data)
                }
            }).catch(e => {
                console.log(`Delete User fail ${e}`);
                props.setDelError("Delete User fail");
            });
    }

    return (
        <button className='button' onClick={handleClick}>Remove</button>
    );

};

export default DeleteUser;