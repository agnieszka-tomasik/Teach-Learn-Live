import React, {useState} from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

const ForumList = (props) => {
    const posts = useSelector(state => state.forum.posts)
    const history = useHistory();
    /***** maps the forum posts to clickable table rows with the corresponding information needed for the list *****/
    const items = posts.map( item =>
        <tr key={item._id} onClick={ () => { history.push(`/forum/${item._id}`) } } >
            <td>
                <br>{item.postTitle} · <i>{item.authUname}</i></br>
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
