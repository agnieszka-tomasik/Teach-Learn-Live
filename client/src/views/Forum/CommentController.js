import React, {useState} from 'react';
import axios from 'axios';

const CommentController = (props) => {
    const [newComment, setNewComment] = useState("");
    const handleClick = () => {
        axios.post('/forum/comment', {
                post: props.post,
                text: newComment
            })
            .then(response => {
                if (response.status === 200) {
                    props.updatePosts(response.data);
                } else {
                    console.log("Comment failed");
                }
            }).catch(e => {
                console.log(`Comment failed with error: ${e}`);
            });
    }

    const handleCommentChange = (comment) => {
        comment.persist();
        setNewComment(comment.target.value);
    }

    return (
        <div className = "field is-grouped is-grouped-right">
            <div className = "Comment-box control">
                {props.post.comments.map((comment) => {
                    return (
                        <div>
                            {comment.postText}
                        </div>
                    );
                })}
            </div>
            <div>
                <form>
                    <input type='text' id='title' placeholder='Enter comment' onChange={handleCommentChange}/>
                </form>
                <button className = "button is-success"
                        onClick = {handleClick}>
                    Comment
                </button>
            </div>
        </div>
    );

};

export default CommentController;