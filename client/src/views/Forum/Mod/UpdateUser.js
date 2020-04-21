import React, { useState } from 'react';
import axios from 'axios';
import "../../Admin/Admin.css"
import useToasts from '../../../components/Toasts';

const UpdateUser = (props) => {
    const [updatedUser, setUpdatedUser] = useState(props.selectedUser);
    const { addError, addSuccess } = useToasts();

    const handleCheckChange = () => {
        let newUser = Object.assign({}, updatedUser);
        newUser.blacklisted = !newUser.blacklisted;
        setUpdatedUser(newUser);
    }

    const handleClick = (e) => {
        e.preventDefault()
        axios.post('/forum/globalblock', updatedUser)
            .then(response => {
                if (response.status === 200) {
                    props.usersUpdate(response.data);
                    addSuccess("Successfully blocked user!");
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
            <h1 className="title">Globally Block User:</h1>
            <form>
                <label>
                    Blocked from forum:
                <input
                        name="isAdmin"
                        type="checkbox"
                        checked={updatedUser.blacklisted}
                        onChange={handleCheckChange} />
                </label>
                <br />
                <button className='button' onClick={handleClick}>Update</button>
            </form>
        </div>
    );

};

export default UpdateUser;