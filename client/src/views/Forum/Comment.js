import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCalendar, faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { delComment } from '../../store/forumSlice';
import "./Comment.css";
import "./Common.css";
import useErrorToast from '../../components/ErrorToast';

/* component used in ForumPost.js to create a comment list */
const Comment = (props) => {
    const [dropdown, setDropdown] = useState(false);
    const dispatch = useDispatch();
    const {addError} = useErrorToast();
    useEffect(() => {
        const off = () => {
            setDropdown(false);
        }
        document.addEventListener("click", off);
        return () => {
            document.removeEventListener("click", off)
        }
    }, []);
    const toggleDropdown = (e) => {
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        setDropdown(!dropdown);
    }
    const deleteComment = props.deleteComment || ((e) => {
        e.preventDefault();
        axios.post('/forum/comment/delete', { post: props.parent, comment: props})
            .then(response => {
                if (response.status === 200) {
                    dispatch(delComment(response.data));
                    
                } else {
                    console.log(`Delete comment fail ${response.data}`);
                    addError(response.data)
                }
            }).catch(e => {
                console.log(`Delete comment fail ${e}`);
                addError("Delete comment fail");
            });
    });
    const blockUser = () => {
        axios.post('/forum/post/localblock', {post: props, username: props.authUname})
            .then(response => {
                if (response.status === 200) {
                } else {
                    console.log("Blocking user failed");
                }
            }).catch(e => {
                console.log("Blocking user failed");
            });
    }
    return (
        <article className="media">
            <figure className="media-left">
                <FontAwesomeIcon icon={faUser} />
            </figure>
            <div className="media-content">
                <div className="content">
                    <p>
                        <b>{props.authUname}</b>
                        <br />
                        <span className="post-text">
                            {props.postText}
                        </span>
                        <br />
                        <small>
                            <FontAwesomeIcon icon={faCalendar} />
                                &nbsp;
                                {moment(props.postDate).fromNow()}</small>
                    </p>
                </div>
            </div>
            <div className="media-right">
                <div className={`dropdown is-right ${dropdown ? "is-active" : ""}`}>
                    <div className="dropdown-trigger">
                        <FontAwesomeIcon onClick={toggleDropdown} style={{ cursor: "pointer" }} icon={faEllipsisH} />
                    </div>
                    <div className="dropdown-menu" id="dropdown-menu6" role="menu">
                        <div className="dropdown-content">
                            <a className="dropdown-item" onClick={deleteComment}>
                                Delete
                            </a>
                            <a className="dropdown-item" onClick={blockUser}>
                                Block
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </article >
    );
}

export default Comment
