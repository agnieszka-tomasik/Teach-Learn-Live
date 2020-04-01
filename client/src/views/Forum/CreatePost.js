import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { forumPostSubmit } from '../../store/forumSlice';

const CreatePost = () => {
    const [title, setTitle] = useState("");
    const [bodyText, setBodyText] = useState("");
    const history = useHistory();
    const dispatch = useDispatch();
    /*************************** Axios post to create a new post ************************************/
    const createPost = (e) => {
        e.preventDefault();
        if (!bodyText || !title) {
            // TODO error message.
            return;
        }

        axios.post('/forum',
            { postTitle: title, postText: bodyText })
            .then(response => {
                if (response.status === 200) {
                    dispatch(forumPostSubmit(response.data));
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
            <form onSubmit={createPost}>

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
                <input
                    className="create-post-submit"
                    type="submit"
                    value="Post"/>
            </form>

        </div>
    );
};

export default CreatePost;