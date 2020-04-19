import React from 'react'
import axios from 'axios'
import "./Forum.css"

const BlockedUser = (props) => {
    const handleClick = () => {
        axios.post('/forum/post/localblock', {post: props.post, username: props.username})
            .then(response => {
                if (response.status === 200) {
                } else {
                    console.log("Blocking user failed");
                }
            }).catch(e => {
                console.log("Blocking user failed");
            });
    }

    return (
        <button className='rm-button' onClick={handleClick}>Block</button>
    );

};
export default BlockedUser