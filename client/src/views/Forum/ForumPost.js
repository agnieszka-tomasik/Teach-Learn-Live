import React, { useRef, useState } from 'react';
import './Forum.css';
import Comment from './Comment.js';
import SubmitComment from './SubmitComment';
import DeleteComment from './DeleteComment';
import BlockedUser from './BlockedUser';
import OriginalPost from './OriginalPost.js';
import BlockedUser from './BlockedUser.js';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector, ReactReduxContext } from 'react-redux';
import { createConnection } from 'mongoose';

const Forum = () => {
    const { id } = useParams();
    const [error, setError] = useState(null);
    const post = useSelector(state => state.forum.posts.find(p => p._id === id));
    const [selected, setSelected] = useState(post);
    if(!post) {
        return <>Loading</>
    }
    /**************** Comments to list: **************
    ** takes an array of comments and turns them into
    ** an html list to be printed below the original post
    */
    const commentsToList = post.comments.map(Comment)

    /******** Print Original Post and Comments (with indent of 50px for comments specified in ForumPost.css) *********/
    return (
        <section>
            <div>
                <OriginalPost data={post} />
                <ul className="comment-list">
                    {commentsToList}
                </ul>
                <br/>
                <SubmitComment parent={post} selected={selected}/>
            </div>
        </section>
    );

}

export default Forum;
