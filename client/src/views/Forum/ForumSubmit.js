import React from 'react';

const ForumSubmit = (props) => {
    let newText;
    let schema = {};

    function handlePost(){
        schema = {
            text: newText
        }
    }
    return(
    <form id = "post-form">
        <input 
        type="text" 
        placeholder="Enter your post"
        onChange = {(e) => {
            newText = e.target.value;
        }}
        />
        <button type = "button"
            onClick = {(e) =>{
                handlePost();
                props.setNewPost(schema);
                document.getElementById("post-form").reset();
            }}>
        Post</button>
    </form>
    )
}

export default ForumSubmit;