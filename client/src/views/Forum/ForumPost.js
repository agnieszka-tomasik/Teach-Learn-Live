import React, { useState } from 'react';
import './Forum.css';
import SubmitComment from './SubmitComment';
import OriginalPost from './OriginalPost.js';
import Comment from './Comment.js';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Forum = () => {
    const [text, setText] = useState("");
    const { id } = useParams();
    const post = useSelector(state => state.forum.posts.find(p => p._id === id));
    if(!post) {
        return <>Loading</>
    }

    const addReference = (id) => {
        const newText = text + "<replyTo:" + id + ">";
        setText(newText);
    }

    const setTextWrapper = (t) => {
        setText(t);
    }

    /**************** Comments to list: **************
    ** takes an array of comments and turns them into
    ** an html list to be printed below the original post
    */
    const commentsToList = post.comments.map(comment =>
        <li key={comment._id} >
            <Comment    parent = {post}
                        data = {comment}
                        addRef = {  () => {addReference(comment._id)} } />
        </li>
    )

    /******** Print Original Post and Comments *********/
    return (
        <section className="hero is-primary is-bold is-fullheight">
            <div>
                <OriginalPost data={post} />
                <ul>
                    {commentsToList}
                </ul>
                <SubmitComment parent={post} setText={setTextWrapper} text={text} />
            </div>
        </section>
    );

}

export default Forum;
