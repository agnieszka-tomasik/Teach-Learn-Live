import React, { useState } from 'react';
import axios from 'axios';
import "../Admin.css"
import useToasts from '../../../components/Toasts';

const UpdatePost = (props) => {
    const [updatedPost, setUpdatedPost] = useState(props.selectedPost);
    const { addError, addSuccess } = useToasts();

    const handleTitleChange = (text) => {
        text.persist();
        let newPost = Object.assign({}, updatedPost);
        newPost.postTitle = text.target.value;
        setUpdatedPost(newPost);
    }

    const handleTextChange = (text) => {
        text.persist();
        let newPost = Object.assign({}, updatedPost);
        newPost.postText = text.target.value;
        setUpdatedPost(newPost);
    }



    const handleClick = (e) => {
        e.preventDefault();
        axios.post('/admin/blog/update', updatedPost)
            .then(response => {
                if (response.status === 200) {
                    addSuccess("Successfully updated post!");
                    props.postsUpdate(response.data);

                } else {
                    console.log(`Update Blog Post fail ${response.data}`);
                    addError(response.data);
                }
            }).catch(e => {
                console.log(`Update Blog Post fail ${e}`);
                addError('Update Blog Post fail');
            });
    }

    return (
        <div>
            <h1 className="title">Update Blog Post:</h1>
            <form>
                <input type='text' className='inputtext' id='title' placeholder={props.selectedPost.postTitle} onChange={handleTitleChange} />
                <input type='text' className='inputtext' id='textblock' placeholder={props.selectedPost.postText} onChange={handleTextChange} />
                <br />
                <button className='button' onClick={handleClick}>Update</button>
            </form>
        </div>
    );

};

export default UpdatePost;