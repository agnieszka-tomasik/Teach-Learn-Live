import React from 'react';
import BlockedUser from './BlockedUser';
import DeletePost from './DeletePost';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import Comment from "./Comment";
import "./OriginalPost.css";
import "./Common.css";

const OriginalPost = (props) => {
    const { authenticated, isAdmin, isMod } = useSelector(store => ({
        authenticated: store.user.authenticated,
        isAdmin: store.user.profile.isAdmin,
        isMod: store.user.profile.isMod
    }));
    return (
        <div className="original-post">
            <div className="title">
                <FontAwesomeIcon icon={faAngleRight} />
                &nbsp;
                {props.data.postTitle}
            </div>
            <Comment {...props.data} />
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
