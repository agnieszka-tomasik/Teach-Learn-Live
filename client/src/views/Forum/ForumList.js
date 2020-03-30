import React, {useState} from 'react';

const ForumList = (props) => {

    /***** maps the forum posts to clickable table rows with the corresponding information needed for the list *****/
    const items = props.data.map( item => 
        <tr key = {item._id} onClick = { () => { props.updateMain(item) } } >
            <td>
                {item.postTitle} <br/>
            </td>
        </tr>
    );


    /**** Renders the list of forum posts as a table ****/
    return (
        <table className = "table table-striped table-hover" >
            {items}
        </table>
    );
}

export default ForumList;