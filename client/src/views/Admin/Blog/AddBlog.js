import React, {useState} from 'react';
import "../Admin.css"

const AddBlog = (props) => {
    const [newPost, setNewPost] = useState(
        {
            postTitle: "",
            postText: ""
        }
    );

    const handleTitleChange = (text) => {
        text.persist();
        setNewPost(prevState => ({
            postTitle: text.target.value,
            postText: prevState.postText
        }))
    };
    const handleTextChange = (text) => {
        text.persist();
        setNewPost(prevState => ({
            postTitle: prevState.postTitle,
            postText: text.target.value
        }))
    };

    const handleClick = () => {
         let inputs = document.getElementsByTagName("input");
         for(let i = 0; i < inputs.length; i++){
             inputs[i].value = "";
         }
         props.addPost(newPost)
    };

    return (
        <div>
            <h1>Add New Blog Post:</h1>
        <form>
            <input type='text' className='inputtext' id='title' placeholder='Blog Post Title' onChange={handleTitleChange}/>
            <input type='text' className='inputtext' id='textblock' placeholder='Blog Post Title' onChange={handleTextChange}/>
            <br/>
            <button className='button' onClick={handleClick}>Add</button>
        </form>
        </div>
    );


};

export default AddBlog;