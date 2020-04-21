import React from 'react';
import "../../Admin/Admin.css"
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
                <p>Blocked from forum: {selectedUser[0].blacklisted ? "Yes" : "No"}</p>
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
