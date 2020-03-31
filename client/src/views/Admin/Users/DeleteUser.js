import React from 'react';
import axios from 'axios';
import "../Admin.css"

const DeleteUser = (props) => {

    const handleClick = () => {
        axios.post('/admin/users/delete', {courseTitle:props.uname})
            .then(response => {
                if (response.status === 200) {
                    props.userListUpdate(response.data);
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
        <button onClick={handleClick}>Remove</button>
    );

};

export default DeleteUser;