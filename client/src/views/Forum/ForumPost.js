import React, { useRef } from 'react';
import './Forum.css';
import SubmitComment from './SubmitComment';
import DeleteComment from './DeleteComment';
import DeletePost from './DeletePost';
import OriginalPost from './OriginalPost.js';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const Forum = () => {
    const { id } = useParams();
    const post = useSelector(state => state.forum.posts.find(p => p._id === id));
    const {authenticated, isAdmin, isMod} = useSelector(store => ({
        authenticated: store.user.authenticated,
        isAdmin: store.user.profile.isAdmin,
        isMod: store.user.profile.isMod
    }));
    if(!post) {
        return <>Loading</>
    }
    console.log(post.comments.map(comment => comment._id));
    /**************** Comments to list: **************
    ** takes an array of comments and turns them into
    ** an html list to be printed below the original post
    */
    const commentsToList = post.comments.map(comment =>
        <div className="Comment-box" >
            <li key={comment._id} >
                {"-- " + comment.authUname + "> " + comment.postText}
                {authenticated && (isMod || isAdmin) && <DeleteComment post={post} comment={comment} >Remove</DeleteComment>}                        
            </li>
        </div>
    )

    /******** Print Original Post and Comments *********/
    return (
        <section className="hero is-primary is-bold is-fullheight">
            <div>
                {authenticated && (isMod || isAdmin) && <DeletePost post={post} >Remove Post</DeletePost>}
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
