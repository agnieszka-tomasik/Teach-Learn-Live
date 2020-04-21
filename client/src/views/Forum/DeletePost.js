import React from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { delPost } from '../../store/forumSlice';
import "./Forum.css"
import { useHistory } from 'react-router-dom';

const DeletePost = (props) => {

    const dispatch = useDispatch();
    const history = useHistory();

    const handleClick = (e) => {
        e.preventDefault()
        axios.post('/forum/post/delete', { post: props.post })
            .then(response => {
                if (response.status === 200) {
                    history.goBack();
                    dispatch(delPost(response.data));
                    //
                } else {
                    console.log(`Delete post fail ${response.data}`);
                    //addError(response.data)
                }
            }).catch(e => {
                console.log(`Delete post fail ${e}`);
                //addError("Delete post fail");
            });
    }

    return (
        <button className='rm-button' onClick={handleClick}>Remove Post</button>
    );

};

export default DeletePost;