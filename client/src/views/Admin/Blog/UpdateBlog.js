import React, {useState} from 'react';
import axios from 'axios';
import "../Admin.css"

const UpdatePost = (props) => {
    const [updatedPost, setUpdatedPost] = useState(props.selectedPost);

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

    

    const handleClick = () => {
        axios.post('/admin/blog/update', updatedPost)
            .then(response => {
                if (response.status === 200) {
                    props.postsUpdate(response.data);
                    props.setUpError(null);
                } else {
                    console.log(`Update Blog Post fail ${response.data}`);
                    props.setUpError(response.data);
                }
            }).catch(e => {
                console.log(`Update Blog Post fail ${e}`);
                props.setUpError('Update Blog Post fail');
            });
    }

    return (
        <div>
            <h1 className="title">Update Blog Post:</h1>
        <form>
            <input type='text' className='inputtext' id='title' placeholder={props.selectedPost.postTitle} onChange={handleTitleChange}/>
            <input type='text' className='inputtext' id='textblock' placeholder={props.selectedPost.postText} onChange={handleTextChange}/>
            <br/>
            <button className='button' onClick={handleClick}>Update</button>
        </form>
        </div>
    );

};

export default UpdatePost;