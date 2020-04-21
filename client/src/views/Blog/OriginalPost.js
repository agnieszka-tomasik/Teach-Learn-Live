import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { delPost } from '../../store/forumSlice';
import "./OriginalPost.css";
import "./Common.css";
import { useHistory } from 'react-router-dom';

const OriginalPost = (props) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const deletePost = () => {
        axios.post('/forum/post/delete', { post: props.data })
            .then(response => {
                if (response.status === 200) {
                    history.goBack();
                    dispatch(delPost(response.data));
                    //
                } else {
                    console.log(`Delete post fail ${response.data}`);
                    //addError(response.data)
                }
            }).catch(e => {
                console.log(`Delete post fail ${e}`);
                //addError("Delete post fail");
            });
    }
    return (
        <div className="original-post">
            <div className="title">
                <FontAwesomeIcon icon={faAngleRight} />
                &nbsp;
                {props.data.postTitle}
            </div>
            {props.data.postText}
        </div>
    )
    // return (
    //     <li className="Post-box" onClick={() => props.setSelected(props.data)}>
    //         {authenticated && (isMod || isAdmin) && <DeletePost post={props.data} >Remove Post</DeletePost>}
    //         <div>{props.data.postTitle}</div>
    //         <div>
    //             {authenticated && (isMod || isAdmin) && <BlockedUser post={props.data} username={props.data.authUname} >Block</BlockedUser>}
    //             {props.data.authUname + "> " + props.data.postText}
    //         </div>
    //     </li>
    // );
}

export default OriginalPost
