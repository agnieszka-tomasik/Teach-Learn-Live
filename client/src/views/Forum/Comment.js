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

/** Hyperlink to comment replying to **/
const CommentLink = (props) => {
  return (
      <a  href={"#" + props.comment._id }
          onMouseOver = {  () => {   props.select(props.comment._id)    } }
          onMouseOut = {  () => { props.select(null)  }   } >
          {props.comment.authUname}
      </a>
  );
}


/* component used in ForumPost.js to create a comment list */
const Comment = (props) => {
    let commentList;
    if(props.parent)
      commentList = props.parent.comments;
    const text = props.postText;

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

    /* I split the comment's single string around reply tags 
    ** this will break the string into chunks containing either
    ** regular text input by the user or just the _id of the
    ** comment that is supposed to have a reference at that point.
    */
    const splitBodyText = text.split(  /<replyTo:(\w*)>/ );


    /* Now I map each string to the necessary component.
    ** If the string is not the _id for some comment it should
    ** just be seen as text.
    ** Otherwise there needs to be a hyperlink reference for the
    ** matching comment.
    **
    ** Note: I use the indices as keys. This array is const so it
    ** will not change size or contents. The strings matching comment ids
    ** could use the comment id as a key, but the strings do not have
    ** a unique identifier to use as a key.
    **
    ** So while using indices as keys is generally discouraged, because of
    ** the static nature of the array it should be fine in this case.
    */
    let commentToLink;
    const bodyAsComponents = splitBodyText.map( (str, index) => {
        if(commentList)
          commentToLink = commentList.find( comment => str === comment._id  );
        if(commentToLink)
            return <CommentLink comment={commentToLink} select={props.select} key={index} />;
        else
            return <span key={index}>{str}</span>;
    });


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
                            {bodyAsComponents}
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
                            <a className="dropdown-item" onClick={props.addReplyTag}>
                                Reply
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </article >
    );
}

export default Comment
