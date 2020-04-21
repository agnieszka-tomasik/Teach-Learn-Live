import React from 'react';
import axios from 'axios';
import "../Admin.css"
import useErrorToast from '../../../components/ErrorToast';

const DeleteEmail = (props) => {

    const { addError } = useErrorToast();

    const handleClick = (e) => {
        e.preventDefault()
        axios.post('/admin/newsletter/delete', { id: props.id })
            .then(response => {
                if (response.status === 200) {
                    props.emailsUpdate(response.data);

                } else {
                    console.log(`Delete Email fail ${response.data}`);
                    addError(response.data)
                }
            }).catch(e => {
                console.log(`Delete Email fail ${e}`);
                addError("Delete Email fail");
            });
    }

    return (
        <button className='button' onClick={handleClick}>Remove</button>
    );

};

export default DeleteEmail;