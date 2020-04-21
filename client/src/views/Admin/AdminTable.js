import React from 'react';
import "./AdminTable.css";
const AdminTable = ({ head, body, error }) => {
    return <div className="tableWrapper">
        <table className="table is-hoverable">
            <thead>
                <tr>
                    {head.map(header => <td key={header}><b>{header}</b></td>)}
                    <td></td>
                </tr>
            </thead>
            <tbody>
                {body}
            </tbody>
        </table>
        {error}
    </div>
}

export default AdminTable;