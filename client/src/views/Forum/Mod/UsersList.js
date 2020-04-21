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
            <tr className='tr' key={user.uname}>
                <td className='td' onClick={() => updateSelectedUser(user.uname)}>{user.uname} </td>
            </tr>
        );
    });

    return <div>{rendList}</div>;
};
export default UsersList;
