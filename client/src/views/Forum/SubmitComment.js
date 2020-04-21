import React, { useState, useEffect } from 'react';
import { addComment, populateForum } from '../../store/forumSlice';
import { useDispatch } from 'react-redux';
import useToasts from '../../components/Toasts';
import axios from 'axios';

const SubmitComment = (props) => {
    const text = props.text;
    const setText = props.setText;
    const dispatch = useDispatch();
    const { addError } = useToasts();

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
            { post: props.parent, text: text, selected: props.selected })
            .then(response => {
                if (response.status === 200) {
                    console.log(props.parent, text);
                    dispatch(addComment(response.data));
                } else {
                    addError("You are blocked from commenting on this post");

                    console.log("Comment failed");
                }
            }).catch(e => {
                addError("You are blocked from commenting on this post");
                console.log(`Comment failed with error: ${e}`);
            });

    }

    return (
        <><form id="post-comment" className="field" onSubmit={handleSubmit}>
            <div className="submit-box control">
                <textarea type="text" className="textarea comment-input" value={text}
                    placeholder="Add a comment" onChange={(e) => { setText(e.target.value); }} />
                <input className="button submit-comment" type="submit" value="Comment" />
            </div>
        </form>
        </>

    )
};

export default SubmitComment;
