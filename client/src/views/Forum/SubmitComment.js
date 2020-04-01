import React, { useState } from 'react';
import { addComment, populateForum } from '../../store/forumSlice';
import './ForumSubmit.css'
import { useDispatch } from 'react-redux';
import axios from 'axios';

const SubmitComment = (props) => {
    const [text, setText] = useState("");
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        //Do not allow empty comment submission
        if (!text)
            return;
        /******** Add Comment to database **********/
        postComment(text);
        //Finally, reset the comment input textbox
        setText("");
    }
    /*************************** Axios post to create a new comment ************************************/
    const postComment = (text) => {

        axios.post('/forum/comment',
            { post: props.parent, text: text })
            .then(response => {
                if (response.status === 200) {
                    console.log(props.parent, text);
                    dispatch(addComment(response.data));
                } else {
                    console.log("Comment failed");
                }
            }).catch(e => {
                console.log(`Comment failed with error: ${e}`);
            });

    }

    return (
        <form id="post-comment" className="field" onSubmit={handleSubmit}>
            <div className="submit-box control">
                <input type="text" className="comment-input" value={text} 
                    placeholder="Enter your comment" onChange={(e) => { setText(e.target.value); }}/>

                <input className="button submit-comment" type="submit" value="Submit"/>
            </div>
        </form>

    )
};

export default SubmitComment;