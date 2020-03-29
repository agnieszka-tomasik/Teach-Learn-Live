import React, {useState} from 'react';
import './Forum.css'
import ForumSubmit from './ForumSubmit'
import CommentController from './CommentController';

const Forum = (props) => {
        //for sprint 3: get rid of this hook so that we don't potentially
        const [newPost, setNewPost] = useState(
                {
                        authUName: "",
                        postTitle: "",
                        postText: ""
                }
        );
        const [posts, setPosts] = useState(props.posts);

        const updatePosts = (posts) => {
                setPosts(posts);
        }

        const forum = posts.map(post => {
                return (
                <div>
                        <div className = "container is-fluid">
                                <div className = "Post-box control">
                                        <div className = "box">
                                                {post.postText}
                                        </div>
                                </div>
                        </div>
                        <div>
                               <CommentController 
                                post = {post}
                                updatePosts = {updatePosts}/>
                        </div>
                </div>
                );
        })
        return(
        <section className = "hero is-primary is-bold is-fullheight"> 
                <div>
                        {forum}
                        <ForumSubmit
                        updatePosts = {updatePosts}/>
                </div>
        </section>);                

}

export default Forum;
