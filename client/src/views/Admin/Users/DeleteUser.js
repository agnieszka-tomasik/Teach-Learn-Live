import React from 'react';
import axios from 'axios';
import "../Admin.css"
import useErrorToast from '../../../components/ErrorToast';

const DeleteUser = (props) => {

    const { addError } = useErrorToast();

    const handleClick = (e) => {
        e.preventDefault()
        axios.post('/admin/users/delete', { uname: props.uname })
            .then(response => {
                if (response.status === 200) {
                    props.usersUpdate(response.data);

                } else {
                    console.log(`Delete User fail ${response.data}`);
                    addError(response.data)
                }
            }).catch(e => {
                console.log(`Delete User fail ${e}`);
                addError("Delete User fail");
            });
    }

    return (
        <button className='button' onClick={handleClick}>Remove</button>
    );

};

export default DeleteUser;