import React, {useState} from 'react';
import axios from 'axios';
import "../Admin.css"

const UpdateUser = (props) => {
    const [updatedUser, setUpdatedUser] = useState(props.selectedUser);

    const handleUnameChange = (text) => {
        text.persist();
        let newUser = updatedUser;
        newUser.uname = text.target.value;
        setUpdatedUser(newUser);
    }

    const handlePassChange = (text) => {
        text.persist();
        let newUser = updatedUser;
        newUser.password = text.target.value;
        setUpdatedUser(newUser);
    }

    const handleEmailChange = (text) => {
        text.persist();
        let newUser = updatedUser;
        newUser.email = text.target.value;
        setUpdatedUser(newUser);
    }

    const handleCheckChange = () => {
        let newUser = updatedUser;
        newUser.isAdmin = !newUser.isAdmin;
        setUpdatedUser(newUser);
    }

    const handleClick = () => {
        axios.post('/admin/users/update', updatedUser)
            .then(response => {
                if (response.status === 200) {
                    props.usersUpdate(response.data);
                    props.setUpError(null);
                } else {
                    console.log(`Update User fail ${response.data}`);
                    props.setUpError(response.data);
                }
            }).catch(e => {
                console.log(`Update User fail ${e}`);
                props.setUpError('Update User fail');
            });
    }

    return (
        <div>
            <h1>Update User:</h1>
        <form>
            <input type='text' className='inputtext' id='title' placeholder={props.selectedUser.uname} onChange={handleUnameChange}/>
            <input type='text' className='inputtext' placeholder={props.selectedUser.email} onChange={handleEmailChange}/>
            <input type='password' className='inputpass' placeholder='New Password' onChange={handlePassChange}/>
            <label>
                Admin:
                <input
                    name="isAdmin"
                    type="checkbox"
                    checked={updatedUser.isAdmin}
                    onChange={handleCheckChange} />
            </label>
            <br/>
            <button className='button' onClick={handleClick}>Update</button>
        </form>
        </div>
    );

};

export default UpdateUser;