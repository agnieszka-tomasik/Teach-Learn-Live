import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

/* component used in ForumPost.js to create a comment list */
const Comment = (props) => {
    return (
        <li className="Comment-box" key={props.key} >
            <article className="media">
                <figure className="media-left">
                    <p className="image 64x64">
                        <FontAwesomeIcon icon={faUser}/>
                    </p>
                </figure>
                <div className="media-content">
                    <div className="content">
                        <p>
                            <b>{props.comment.authUname}</b>
                            <br/>
                            {props.comment.postText}
                            <br />
                            <small>{props.comment.postDate}</small>
                        </p>
                    </div>
                </div>
            </article>
        </li>
    );
}

export default Comment
