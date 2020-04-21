import React, { useRef, useState } from 'react';
import './Forum.css';
import Comment from './Comment.js';
import SubmitComment from './SubmitComment';
import DeleteComment from './DeleteComment';
import BlockedUser from './BlockedUser';
import OriginalPost from './OriginalPost.js';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector, ReactReduxContext } from 'react-redux';
import { createConnection } from 'mongoose';

const Forum = () => {
    const { id } = useParams();
    const post = useSelector(state => state.forum.posts.find(p => p._id === id));
    const [selected, setSelected] = useState(post);
    const {authenticated, isAdmin, isMod} = useSelector(store => ({
        authenticated: store.user.authenticated,
        isAdmin: store.user.profile.isAdmin,
        isMod: store.user.profile.isMod
    }));
    if(!post) {
        return <>Loading</>
    }
    /**************** Comments to list: **************
    ** takes an array of comments and turns them into
    ** an html list to be printed below the original post
    */
<<<<<<< HEAD
    const commentsToList = post.comments.map(Comment)
=======
    const levelPrefix = (level) => {
        let acc = "";
        for(let i = 0; i < level; i++){
            acc += "| ";
        }
        return acc;
    }

    const renderComments = (comments, level) => {
        if(comments == undefined || comments == null || comments.length == 0){
            return [];
        }else{
            let acc = [];
            for(let i = 0; i < comments.length; i++){
                acc.push({post:comments[i], level:level});
                acc = acc.concat(renderComments(comments[i].comments, level + 1));
            }
            return acc;
        }
    }

    const commentsToList = renderComments(post.comments, 1).map(comment =>
        <div className="Comment-box" >
            <li onClick={() => setSelected(comment.post)} key={comment.post._id} >
                {authenticated && (isMod || isAdmin) && <BlockedUser post={post} username={comment.authUname} >Block</BlockedUser>}  
                {levelPrefix(comment.level) + comment.post.authUname + "> " + comment.post.postText}
                {authenticated && (isMod || isAdmin) && <DeleteComment post={post} comment={comment.post} >Remove</DeleteComment>}          
            </li>
        </div>
    )
>>>>>>> brandon/dev

    /******** Print Original Post and Comments (with indent of 50px for comments specified in ForumPost.css) *********/
    return (
<<<<<<< HEAD
        <section className="hero is-primary is-bold is-fullheight">
            <div>
                <OriginalPost data={post} />
                <ul className="comment-list">
=======
        <section className="hero is-primary is-bold is-fullheight post-view">
            <div> 
                <ul>
                    <OriginalPost data={post} setSelected={setSelected}/>
>>>>>>> brandon/dev
                    {commentsToList}
                </ul>
                <SubmitComment parent={post} selected={selected}/>
            </div>
        </section>
    );

}

export default Forum;
