import React from 'react';
const Table = ({ head, body, error }) => {
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

export default Table;