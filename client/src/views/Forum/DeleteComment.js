import React from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { delComment } from '../../store/forumSlice';
import "./Forum.css"

const DeleteComent = (props) => {

    const dispatch = useDispatch();

    const handleClick = () => {
        axios.post('/admin/forum/delete/comment', {post:props.post, comment:props.comment})
            .then(response => {
                if (response.status === 200) {
                    dispatch(delComment(response.data));
                    //props.setDelError(null);
                } else {
                    console.log(`Delete comment fail ${response.data}`);
                    //props.setDelError(response.data)
                }
            }).catch(e => {
                console.log(`Delete comment fail ${e}`);
                //props.setDelError("Delete comment fail");
            });
    }

    return (
        <button className='rm-button' onClick={handleClick}>Remove</button>
    );

};

export default DeleteComent;