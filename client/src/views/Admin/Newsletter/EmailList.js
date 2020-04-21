import React, { useState, useEffect } from 'react';
import DeleteEmail from './DeleteEmail';
import "../Admin.css"

const EmailList = (props) => {

    const rendList = props.data.filter((email) => {
        return (email.email && email.email.includes(props.filterText) || props.filterText === "")
    })
        .map(email => {
            return (
                <tr className='tr' key={email.email}>
                    <td className='td'>{email.email} </td>
                    <td>
                        <DeleteEmail
                            id={email._id}
                            emailsUpdate={props.emailsUpdate}
                            setDelError={props.setDelError}
                        />
                    </td>
                </tr>
            );
        });

    return <div>{rendList}</div>;
};
export default EmailList;
