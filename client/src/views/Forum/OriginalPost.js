import React from 'react';
import BlockedUser from './BlockedUser';
import DeletePost from './DeletePost';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faAngleRight } from '@fortawesome/free-solid-svg-icons'
import moment from 'moment';
import "./OriginalPost.css";

const OriginalPost = (props) => {
    const { authenticated, isAdmin, isMod } = useSelector(store => ({
        authenticated: store.user.authenticated,
        isAdmin: store.user.profile.isAdmin,
        isMod: store.user.profile.isMod
    }));
    return (
        <div className="original-post">
            <div className="title">
                <FontAwesomeIcon icon={faAngleRight}/>
                &nbsp;
                {props.data.postTitle}
            </div>
            <article className="media">
                <figure className="media-left">
                    <FontAwesomeIcon icon={faUser} />
                </figure>
                <div className="media-content">
                    <div className="content">
                        <b>{props.data.authUname}</b>
                        <br/>
                        {props.data.postText}
                        <br />
                        <small>{moment(props.data.postDate).fromNow()}</small>
                        {/* {authenticated && (isMod || isAdmin) && <DeletePost post={props.data} >Remove Post</DeletePost>} */}
                    </div>
                </div>
            </article>
        </div>
    )
    return (
        <li className="Post-box" onClick={() => props.setSelected(props.data)}>
            {authenticated && (isMod || isAdmin) && <DeletePost post={props.data} >Remove Post</DeletePost>}
            <div>{props.data.postTitle}</div>
            <div>
                {authenticated && (isMod || isAdmin) && <BlockedUser post={props.data} username={props.data.authUname} >Block</BlockedUser>}
                {props.data.authUname + "> " + props.data.postText}
            </div>
        </li>
    );
}

export default OriginalPost
