import React, {useState, useEffect} from 'react';
import DeleteUser from './DeleteUser';
import "../Admin.css"

const UsersList = (props) => {

    const updateSelectedUser = (uname) => {
        props.updateSelectedUser(uname);
    };

    const rendList = props.data.filter((user) => {
        return (user.uname === props.filterText || props.filterText === "")
    })
    .map(user => {
        return (
            <tr key={user.uname}>
                <td onClick={() => updateSelectedUser(user.uname)}>{user.uname} </td>
                <td onClick={() => updateSelectedUser(user.uname)}>{user.email} </td>
                <DeleteUser
                    uname={user.uname}
                    userListUpdate={props.userListUpdate}
                    setDelError={props.setDelError}
                />
            </tr>
        );
    });

    return <div>{rendList}</div>;
};
export default UsersList;
