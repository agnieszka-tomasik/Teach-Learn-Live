import React, { useState } from 'react';
import { addComment } from '../../store/forumSlice';
import './ForumSubmit.css'
import { useDispatch } from 'react-redux';
import axios from 'axios';

const SubmitComment = (props) => {
    const [text, setText] = useState("");
    const dispatch = useDispatch();

    const handleSubmit = () => {
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
                    dispatch(addComment({ post: props.parent, text }));
                } else {
                    console.log("Comment failed");
                }
            }).catch(e => {
                console.log(`Comment failed with error: ${e}`);
            });

    }

    return (
        <form id="post-comment" className="field">
            <div className="submit-box control">

                <input
                    type="text"
                    className="comment-input"
                    value={text}
                    placeholder="Enter your comment"
                    onChange={(e) => { setText(e.target.value); }}
                />

                <button
                    className="button submit-comment"
                    type="button"
                    onClick={handleSubmit}
                >
                    Submit</button>

            </div>
        </form>

    )
};

export default SubmitComment;