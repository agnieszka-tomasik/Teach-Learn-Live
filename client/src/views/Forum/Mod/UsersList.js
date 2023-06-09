import React, {useState, useEffect} from 'react';
import "../../Admin/Admin.css"

const UsersList = (props) => {

    const updateSelectedUser = (uname) => {
        props.selectedUpdate(uname);
    };

    const rendList = props.data.filter((user) => {
        return (user.uname.includes(props.filterText) || props.filterText === "")
    })
    .map(user => {
        return (
            <tr  key={user.uname}>
                <td onClick={() => updateSelectedUser(user.uname)}>{user.uname} </td>
                <td></td>
            </tr>
        );
    });

    return <div>{rendList}</div>;
};
export default UsersList;
