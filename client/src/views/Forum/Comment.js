import React from 'react';

const Comment = (props) => {
    return (
        <li className = "Comment-box" key = {props.data._id} >
            {props.data.postText}
        </li>
    );
}

export default Comment