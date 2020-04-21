import React, { useRef, useState } from 'react';
import './Forum.css';
import Comment from './Comment.js';
import SubmitComment from './SubmitComment';
import OriginalPost from './OriginalPost.js';
import { useParams, useLocation } from 'react-router-dom';
import { useDispatch, useSelector, ReactReduxContext } from 'react-redux';

const Forum = () => {
    const { id } = useParams();
    const post = useSelector(state => state.forum.posts.find(p => p._id === id));
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
    const commentsToList = post.comments.map(c => 
    <li className="comment-box" key={c._id}
        style={ {background: ( (!selectedComment && location.hash === "#" + c._id) || selectedComment === c._id) && '#01FFFF'}  } >
        <Comment addReplyTag={() => addReplyTag(c._id)} select={selectComment} parent={post} {...c} />
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
                <SubmitComment text={text} setText={setSubmitText} parent={post} selected={selected} />
            </div>
        </section>
    );

}

export default Forum;
