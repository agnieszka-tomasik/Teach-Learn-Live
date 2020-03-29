import React from 'react';
import './ForumSubmit.css'
import Axios from 'axios';

const ForumSubmit = (props) => {
    let newText;
    let schema = {};

    function handlePost(){
        schema = {
            authUName: "",
            postTitle: "",
            postText: newText
        }
    }

    const addPost = (post) => {
        Axios.post('/forum', post)
            .then(res => {
                if (res.status === 200) {
                    props.updatePosts(res.data);
                }
                else {
                    console.log(`Failed to add post: ${res.data}`);
                }
            }).catch(err => {
                console.log(`Failed to add post with error: ${err}`);
            });
    };

    return(
            <form id = "post-form" className = "field">
                <div className = "submit-box control">
                <input 
                type="text"
                className = "input" 
                placeholder="Enter your post"
                onChange = {(e) => {
                    newText = e.target.value;
                }}
                />
                <button 
                className = "button is-light"
                type = "button"
                    onClick = {(e) =>{
                        handlePost();
                        addPost(schema);
                        //props.setNewPost(schema);
                        document.getElementById("post-form").reset();
                    }}>
                Post</button>
                </div>
            </form>
        
    )
}

export default ForumSubmit;