import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const CreatePost = () => {
    const [title, setTitle] = useState("");
    const [bodyText, setBodyText] = useState("");
    const history = useHistory();
    /*************************** Axios post to create a new post ************************************/
    const createPost = (title, body) => {
        if (!body || !title) {
            // TODO error message.
            return;
        }

        axios.post('/forum',
            { postTitle: title, postText: body })
            .then(response => {
                if (response.status === 200) {
                    history.goBack();
                } else {
                    console.log(`Failed to add post: ${response.data}`);
                }
            }).catch(err => {
                console.log(`Failed to add post with error: ${err}`);
            });

    }

    return (
        <div>
            <form>

                <input
                    className="create-post-title"
                    type="text"
                    value={title}
                    onChange={(e) => { setTitle(e.target.value) }}
                    placeholder="Enter your title" />

                <input
                    className="create-post-body-text"
                    type="text"
                    value={bodyText}
                    onChange={(e) => { setBodyText(e.target.value) }}
                    placeholder="Enter your post" />

            </form>

            <button
                className="create-post-submit"
                onClick={createPost} >
                Submit
            </button>
        </div>
    );
};

export default CreatePost;