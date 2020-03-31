import React, {useState} from 'react';

const CreatePost = React.forwardRef( (props, ref) => {
    const [title, setTitle] = useState("");
    const [bodyText, setBodyText] = useState("");

    /************** Add post to database ****************/
    const submitNewPost = () => {
        //Do not allow submission with no body text
        if(bodyText) {
            /*********** Add new forum post to database ************/
            props.createPost(title, bodyText);
        }
    }

    return (
        <div>
            <form>

                <input
                className = "create-post-title"
                type = "text"
                value = {title}
                onChange = { (e) => { setTitle(e.target.value) } }
                placeholder = "Enter your title" />

                <input
                className = "create-post-body-text"
                type = "text"
                value = {bodyText}
                onChange = { (e) => { setBodyText(e.target.value) } }
                placeholder = "Enter your post" />

            </form>
        
            <button 
            className = "create-post-submit"
            onClick = {submitNewPost} >
                Submit
            </button>
        </div>
    );
} );

export default CreatePost;