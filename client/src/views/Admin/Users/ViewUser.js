import React from 'react';
import "../Admin.css"
import UpdateUser from './UpdateUser';
import { useSelector } from 'react-redux';

const ViewUser = (props) => {
    let selectedUser = useSelector(state => state.admin.users.find(user => user.uname === props.uname));

    if (!selectedUser){
        return (
            <div>
                <p>
                    {' '}
                    <i>Click on a user to view more information</i>
                </p>
            </div>
        );
    }
    else
    {
        return (
            <div>
                <h2>{selectedUser.uname}</h2> <p>Email: {selectedUser.email}</p>
                <p>Join Date: {selectedUser.joinDate}</p>
                <p>Admin: {selectedUser.isAdmin ? "Yes" : "No"}</p>
                <p>Courses: {selectedUser.courses}</p>
                <UpdateUser
                    selectedUser={selectedUser}
                    usersUpdate={props.usersUpdate}
                />
            </div>
        );
    }
};
export default ViewUser;
