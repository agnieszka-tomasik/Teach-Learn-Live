import React, { useState, useEffect } from 'react';
import DeleteEmail from './DeleteEmail';
import "../Admin.css"

const EmailList = (props) => {

    const rendList = props.data.filter((email) => {
        return (email.email && email.email.includes(props.filterText) || props.filterText === "")
    })
        .map(email => {
            return (
                <tr  key={email.email}>
                    <td >{email.email} </td>
                    <td>
                        <DeleteEmail
                            id={email._id}
                            emailsUpdate={props.emailsUpdate}
                            
                        />
                    </td>
                </tr>
            );
        });

    return <div>{rendList}</div>;
};
export default EmailList;
