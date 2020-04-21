import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faAngleRight } from '@fortawesome/free-solid-svg-icons'
import "./ForumList.css";

const ForumList = (props) => {
    const posts = useSelector(state => state.forum.posts)
    const history = useHistory();
    /***** maps the forum posts to clickable table rows with the corresponding information needed for the list *****/
    const items = posts.map(item =>
        <li className="forum-list-item" key={item._id} onClick={() => { history.push(`/forum/${item._id}`) }} >
            <div>
                <FontAwesomeIcon icon={faAngleRight}/>
                &nbsp;
                <b>{item.postTitle}</b>
                <br />
                <FontAwesomeIcon icon={faUser} />
                &nbsp;
                <i>{item.authUname}</i>
            </div>
        </li>
    );
    /**** Renders the list of forum posts as a table ****/
    return (
        <ul className="forum-list" >
            {items}
        </ul>
    );
}

export default ForumList;
