import React from 'react';
import BlockedUser from './BlockedUser';
import { useDispatch, useSelector } from 'react-redux';

const OriginalPost = (props) => {
    const {authenticated, isAdmin, isMod} = useSelector(store => ({
        authenticated: store.user.authenticated,
        isAdmin: store.user.profile.isAdmin,
        isMod: store.user.profile.isMod
    }));
    return (
        <div className = "Post-box" >
            <div>{props.data.postTitle}</div>
            <div>
                {authenticated && (isMod || isAdmin) && <BlockedUser post={props.data} username={props.data.authUname} >Block</BlockedUser>}
                {props.data.authUname + "> " + props.data.postText}
            </div>
            {}
        </div>
    );
}

export default OriginalPost