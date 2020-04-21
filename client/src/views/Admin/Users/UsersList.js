import React, { useState, useEffect } from 'react';
import DeleteUser from './DeleteUser';
import "../Admin.css"

const UsersList = (props) => {

    const updateSelectedUser = (uname) => {
        props.selectedUpdate(uname);
    };

    const rendList = props.data.filter((user) => {
        return (user.uname && user.uname.includes(props.filterText) || props.filterText === "")
    })
        .map(user => {
            return (
                <tr className='tr' key={user.uname}>
                    <td className='td' onClick={() => updateSelectedUser(user.uname)}>{user.uname} </td>
                    <td className='td' onClick={() => updateSelectedUser(user.uname)}>{user.email} </td>
                    <td className="td">
                        <DeleteUser
                            uname={user.uname}
                            usersUpdate={props.usersUpdate}
                            setDelError={props.setDelError}
                        />
                    </td>
                </tr>
            );
        });

    return rendList;
};
export default UsersList;
