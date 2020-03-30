import React, { useRef} from 'react';
import './Forum.css';
import SubmitComment from './SubmitComment';
import Comment from './Comment.js';
import OriginalPost from './OriginalPost.js';

const Forum = (props) => {

        /* Reference to the SubmitComment box.          **
        ** Is needed to add reference to comments       **
        ** the user wants to respond to.                **
        **************************************************/
       const newCommentRef = useRef(null);


       /**************** Add reference: **************
       **  When comment is selected, a reference   ***
       **  to that comment is added to the text    ***
       **  of the new comment input                ***
       */
       const addReference = (commentId) => {
               newCommentRef.current.value += commentId + "\n";
       }


        const commentsToList = (comments) => {
                return (
                        <ul>
                                {
                                        comments.map( 
                                        comment =>
                                                <li className = "Comment-box" key = {comment._id} >
                                                        {comment.postText}
                                                </li>
                                                
                                        )
                                }
                        </ul>
                );
        }

        const orig = <OriginalPost data = {props.data} />;
        const comments = commentsToList(props.data.comments);


        /******************* Add Comment **********************
        ** Adds a new comment to the database containing the **
        ** current contents of the comment submission box.   **
        */
        const addComment = (text) => {
                /* Will need to access authUname and create postId
                ** Set parentId with props.id (?)
                */
                props.addComment( text, props.data._id );
        }

        /******** Print Original Post and Comments *********/

        return(
        <section className = "hero is-primary is-bold is-fullheight"> 
                <div>
                        {orig}
                        {comments}
                        <SubmitComment
                        ref = {newCommentRef} 
                        addComment = {addComment} />
                </div>
        </section>
        );                

}

export default Forum;
