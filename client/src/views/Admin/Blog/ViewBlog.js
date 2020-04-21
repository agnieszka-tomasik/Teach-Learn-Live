import React from 'react';
import "../Admin.css"
import UpdateBlog from './UpdateBlog';

const ViewBlog = (props) => {
    let selectedPost = props.data.filter(post => post._id === props.id);

    if (!selectedPost[0]){
        return (
            <div>
                <p>
                    {' '}
                    <i>Click on a post to view more information</i>
                </p>
            </div>
        );
    }
    else
    {
        return (
            <div>
                <h2>{selectedPost[0].postTitle}</h2>
                <p>Body: {selectedPost[0].postText}</p>
                <UpdateBlog
                    selectedPost={selectedPost[0]}
                    postsUpdate={props.postsUpdate}
                />
            </div>
        );
    }
};
export default ViewBlog;
