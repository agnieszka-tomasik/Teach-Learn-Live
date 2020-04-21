import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import "./Comment.css";

/* component used in ForumPost.js to create a comment list */
const Comment = (props) => {
    return (
        <li className="comment-box" key={props.key} >
            <article className="media">
                <figure className="media-left">
                    <FontAwesomeIcon icon={faUser}/>
                </figure>
                <div className="media-content">
                    <div className="content">
                        <p>
                            <b>{props.comment.authUname}</b>
                            <br/>
                            {props.comment.postText}
                            <br />
                            <small>{moment(props.comment.postDate).fromNow()}</small>
                        </p>
                    </div>
                </div>
            </article>
        </li>
    );
}

export default Comment
