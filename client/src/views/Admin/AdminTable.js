import React from 'react';
import "./AdminTable.css";
const AdminTable = ({ head, body }) => {
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
    </div>
}

export default AdminTable;