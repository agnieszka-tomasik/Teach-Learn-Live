import React, { useRef, useState } from 'react';
import './Forum.css';
import OriginalPost from './OriginalPost.js';
import { useParams, useLocation } from 'react-router-dom';
import { useDispatch, useSelector, ReactReduxContext } from 'react-redux';

const Forum = () => {
    const { id } = useParams();
    const post = useSelector(state => state.blog.posts.find(p => p._id === id));
    const [selected, setSelected] = useState(post);
    const [selectedComment, setSelectedComment] = useState(null);
    const [text, setText] = useState("");
    const selectComment = (comment_id) => {setSelectedComment(comment_id)};
    const setSubmitText = (t) => {setText(t)}
    const location = useLocation()
    const addReplyTag = (id) => {
        setText(text + "<replyTo:" + id + ">");
    }
    if (!post) {
        return <>Loading</>
    }
    /**************** Comments to list: **************
    ** takes an array of comments and turns them into
    ** an html list to be printed below the original post
    */

    /******** Print Original Post and Comments (with indent of 50px for comments specified in ForumPost.css) *********/
    return (
        <section>
            <div>
                <OriginalPost data={post} />
            </div>
        </section>
    );

}

export default Forum;
