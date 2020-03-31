import React from 'react';
import "../Admin.css"
import UpdateUser from './UpdateUser';

const ViewUser = (props) => {
    let selectedUser = props.data.filter(user => user.uname === props.uname);

    if (!selectedUser[0]){
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
                <h2>{selectedUser[0].uname}</h2>
                <p>Email: {selectedUser[0].email}</p>
                <p>Join Date: {selectedUser[0].joinDate}</p>
                <p>Courses: {selectedUser[0].courses}</p>
                <UpdateUser
                    selectedUser={selectedUser[0]}
                    usersUpdate={props.usersUpdate}
                    setUpError={props.setUpError}
                />
            </div>
        );
    }
};
export default ViewUser;
