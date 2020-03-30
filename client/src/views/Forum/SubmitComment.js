import React, { useState, useRef } from 'react';
import './ForumSubmit.css'

const SubmitComment = React.forwardRef( (props, ref) => {
    const [text, setText] = useState("");
    
    const handleSubmit = () => {
        //Do not allow empty comment submission
        if(!text)
            return;
        
        /******** Add Comment to database **********/
        props.addComment(text);

        //Finally, reset the comment input textbox
        setText("");
    }

    return(
            <form id = "post-comment" className = "field">
                <div className = "submit-box control">

                    <input
                    ref = {ref}
                    type="text"
                    className = "comment-input" 
                    value = {text}
                    placeholder = "Enter your comment"
                    onChange = { (e) => { setText(e.target.value); } }
                    />

                    <button 
                    className = "button submit-comment"
                    type = "button"
                    onClick = {handleSubmit}
                    >
                    Submit</button>

                </div>
            </form>
        
    )
} );

export default SubmitComment;