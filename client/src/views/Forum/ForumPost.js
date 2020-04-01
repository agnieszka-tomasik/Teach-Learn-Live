import React, { useRef } from 'react';
import './Forum.css';
import SubmitComment from './SubmitComment';
import OriginalPost from './OriginalPost.js';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Forum = () => {
    const { id } = useParams();
    const post = useSelector(state => state.forum.posts.find(p => p._id === id));
    if(!post) {
        return <>Loading</>
    }
    /**************** Comments to list: **************
    ** takes an array of comments and turns them into
    ** an html list to be printed below the original post
    */
    const commentsToList = post.comments.map(comment =>
        <div className="Comment-box" >
            <li key={comment._id} >
                {comment.postText}
            </li>
        </div>
    )

    /******** Print Original Post and Comments *********/
    return (
        <section className="hero is-primary is-bold is-fullheight">
            <div>
                <OriginalPost data={post} />
                <ul>
                    {commentsToList}
                </ul>
                <SubmitComment parent={post} />
            </div>
        </section>
    );

}

export default Forum;
