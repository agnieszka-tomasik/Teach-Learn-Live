import React from 'react';

const OriginalPost = (props) => {
    return (
        <div className = "Post-box" >
            <div>{props.data.postTitle}</div>
            <div>{props.data.postText}</div>
        </div>
    );
}

export default OriginalPost