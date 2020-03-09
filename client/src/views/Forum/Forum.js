import React, {useState} from 'react';
import './Forum.css'
import ForumSubmit from './ForumSubmit'
import data from '../../data'

const Forum = (props) => {
        const [newPost, setNewPost] = useState();

        if(newPost != null){
                data.push(newPost);
                setNewPost();
        }

        const forum = data.map(post => {
                return (
                <div>
                        <div className = "App">
                        {post.text}
                        </div>
                        <div>
                        comment
                        </div>
                </div>
                );
        })
        return( 
        <div>{forum}
                <div>
                <ForumSubmit
                setNewPost = {setNewPost}/>
                </div>
        </div>);                

}

export default Forum;
