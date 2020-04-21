import React, { useState } from 'react';
import { addComment, populateForum } from '../../store/forumSlice';
import { useDispatch } from 'react-redux';
import axios from 'axios';

const SubmitComment = (props) => {
    const [text, setText] = useState("");
    const dispatch = useDispatch();

    console.log(text);
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
            { post: props.parent, text:text, selected:props.selected})
            .then(response => {
                if (response.status === 200) {
                    console.log(props.parent, text);
                    dispatch(addComment(response.data));
                } else {
                    props.setError("You are blocked from commenting on this post");
                    console.log("Comment failed");
                }
            }).catch(e => {
                props.setError("You are blocked from commenting on this post");
                console.log(`Comment failed with error: ${e}`);
            });

    }

    return (
<<<<<<< HEAD
        <form id="post-comment" className="field" onSubmit={handleSubmit}>
            <div className="submit-box control">
                <input type="text" className="comment-input" value={text} 
                    placeholder="Enter your comment" onChange={(e) => { setText(e.target.value); }}/>
                <input className="button submit-comment" type="submit" value="Submit"/>
            </div>
=======
        <form
          id="post-comment"
          onSubmit={handleSubmit}>
          <div className="submit-box control">
            <article className="media">
              <div className="media-content">
                <div className="field">
                  <p className="control">
                        <textarea
                          className="textarea comment-input"
                          type="text"
                          value={text}
                          onChange={(e) => { setText(e.target.value) }}
                          placeholder="Enter your comment" />
                  </p>
                </div>
                <div className="field">
                  <p className="control">
                      <input
                          className="button submit-comment"
                          type="submit"
                          value="Post"/>
                  </p>
                </div>
              </div>
            </article>
          </div>
>>>>>>> 29a5072420156e455c11f0aaaa80228b1c011a7c
        </form>

    )
};

export default SubmitComment;
