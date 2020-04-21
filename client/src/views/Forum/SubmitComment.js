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
          className="field"
          onSubmit={handleSubmit}>
          <div className="submit-box control">
            /*
             * The 'Media Object' layout imported from Bulma is used here
             * https://bulma.io/documentation/layout/media-object/
             * displays the field where a comment can be created
             */
            <article class="media">
              <div class="media-content">
                <div class="field">
                  <p class="control">
                    <textarea class="textarea">
                      <form>
                        <input
                          className="comment-input"
                          type="text"
                          value={text}
                          onChange={(e) => { setText(e.target.value) }}
                          placeholder="Enter your comment" />
                      </form>
                    </textarea>
                  </p>
                </div>
                <div class="field">
                  <p class="control">
                    <button>
                      <input
                          className="button submit-comment"
                          type="submit"
                          value="Post"/>
                    </button>
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
