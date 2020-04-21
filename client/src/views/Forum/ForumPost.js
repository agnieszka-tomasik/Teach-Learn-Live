import React, { useRef, useState } from 'react';
import './Forum.css';
import Comment from './Comment.js';
import SubmitComment from './SubmitComment';
import OriginalPost from './OriginalPost.js';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector, ReactReduxContext } from 'react-redux';

const Forum = () => {
    const { id } = useParams();
    const post = useSelector(state => state.forum.posts.find(p => p._id === id));
    const [selected, setSelected] = useState(post);
    if (!post) {
        return <>Loading</>
    }
    /**************** Comments to list: **************
    ** takes an array of comments and turns them into
    ** an html list to be printed below the original post
    */
    const commentsToList = post.comments.map(c => <li className="comment-box" key={c._id}>
        <Comment parent={post} {...c} />
    </li>)

    /******** Print Original Post and Comments (with indent of 50px for comments specified in ForumPost.css) *********/
    return (
        <section>
            <div>
                <OriginalPost data={post} />
                <ul className="comment-list">
                    {commentsToList}
                </ul>
                <br />
                <SubmitComment parent={post} selected={selected} />
            </div>
        </section>
    );

}

export default Forum;
