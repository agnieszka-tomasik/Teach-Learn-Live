import React from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { delPost } from '../../store/forumSlice';
import "./Forum.css"

const DeletePost = (props) => {

    const dispatch = useDispatch();

    const handleClick = () => {
        axios.post('/forum/post/delete', {post:props.post})
            .then(response => {
                if (response.status === 200) {
                    dispatch(delPost(response.data));
                    //props.setDelError(null);
                } else {
                    console.log(`Delete post fail ${response.data}`);
                    //props.setDelError(response.data)
                }
            }).catch(e => {
                console.log(`Delete post fail ${e}`);
                //props.setDelError("Delete post fail");
            });
    }

    return (
        <button className='rm-button' onClick={handleClick}>Remove Post</button>
    );

};

export default DeletePost;