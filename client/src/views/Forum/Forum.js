import React, {useState} from 'react';
import './Forum.css'
import ForumSubmit from './ForumSubmit'
import data from '../../data'

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

        if(newPost != null){
                data.push(newPost);
                setNewPost();
        }

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
                        <div className = "field is-grouped is-grouped-right">
                                <div className = "Comment-box control">
                                        <input className = "input is-black" type = "text" placeholder = "comment input"/>
                                </div>
                                <button className = "button is-success"
                                        onClick = {(e) => {
                                                console.log("watashi ga kita");
                                        }}>
                                Comment
                                </button>
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
