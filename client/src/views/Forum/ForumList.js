import React, {useState} from 'react';

const ForumList = (props) => {

    const items = props.data.map( item => 
        <tr key = {item._id} onClick = { () => { props.updateMain(item) } } >
            <td>
                {item.postTitle} <br/>
            </td>
        </tr>
    );

    return (
        <table className = "table table-striped table-hover" >
            {items}
        </table>
    );
}

export default ForumList;