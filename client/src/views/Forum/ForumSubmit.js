import React from 'react';
import './ForumSubmit.css';

const ForumSubmit = (props) => {
    let newText;
    let schema = {};

    function handlePost() {
        schema = {
            text: newText,
        };
    }
    return (

        <form id="post-form" className="field">
            <div className="submit-box control">
                <input
                  type="text"
                  className="input"
                  placeholder="Enter your post"
                  onChange={(e) => {
                        newText = e.target.value;
                    }}
                />
                <button
                  className="button is-light"
                  type="button"
                  onClick={() => {
                      handlePost();
                      props.setNewPost(schema);
                      document.getElementById('post-form').reset();
                  }}
                >
                    Post
                </button>
            </div>
        </form>

    );
};

export default ForumSubmit;
