import React, { useState } from 'react';
import axios from 'axios';
import "../Admin.css"
import useToasts from '../../../components/Toasts';

const UpdateUser = (props) => {
    const [updatedUser, setUpdatedUser] = useState(props.selectedUser);
    const { addError, addSuccess} = useToasts();

    const handleUnameChange = (text) => {
        text.persist();
        let newUser = Object.assign({}, updatedUser);
        newUser.uname = text.target.value;
        setUpdatedUser(newUser);
    }

    const handlePassChange = (text) => {
        text.persist();
        let newUser = Object.assign({}, updatedUser);
        newUser.password = text.target.value;
        setUpdatedUser(newUser);
    }

    const handleEmailChange = (text) => {
        text.persist();
        let newUser = Object.assign({}, updatedUser);
        newUser.email = text.target.value;
        setUpdatedUser(newUser);
    }

    const handleCheckChange = () => {
        let newUser = Object.assign({}, updatedUser);
        newUser.isAdmin = !newUser.isAdmin;
        setUpdatedUser(newUser);
    }

    const handleModCheckChange = () => {
        let newUser = Object.assign({}, updatedUser);
        newUser.isMod = !newUser.isMod;
        setUpdatedUser(newUser);
    }

    const handleClick = (e) => {
        e.preventDefault()
        axios.post('/admin/users/update', updatedUser)
            .then(response => {
                if (response.status === 200) {
                    addSuccess("Successfully updated user!");
                    props.usersUpdate(response.data);

                } else {
                    console.log(`Update User fail ${response.data}`);
                    addError(response.data);
                }
            }).catch(e => {
                console.log(`Update User fail ${e}`);
                addError('Update User fail');
            });
    }

    return (
        <div>
            <h1 className="title">Update User:</h1>
            <form>
                <input type='text' className='inputtext' id='title' placeholder={props.selectedUser.uname} onChange={handleUnameChange} />
                <input type='text' className='inputtext' placeholder={props.selectedUser.email} onChange={handleEmailChange} />
                <input type='password' className='inputpass' placeholder='New Password' onChange={handlePassChange} />
                <label>
                    Admin:
                <input
                        name="isAdmin"
                        type="checkbox"
                        checked={updatedUser.isAdmin}
                        onChange={handleCheckChange} />
                </label>
                <br />
                <label>
                    Moderator:
                <input
                        name="isAdmin"
                        type="checkbox"
                        checked={updatedUser.isMod}
                        onChange={handleModCheckChange} />
                </label>
                <br />
                <button className='button' onClick={handleClick}>Update</button>
            </form>
        </div>
    );

};

export default UpdateUser;