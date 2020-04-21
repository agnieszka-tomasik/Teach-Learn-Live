import React, {useState} from 'react';
import axios from 'axios';

/* I believe this page is obsolete; SubmitComment replaces it, and I cannot find where CommentController
 * is exported, but its format has been updated anyways in case I missed some part of the control flow
 */

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
        /* The text in the comment-box display and the comment field is centered right */
        <div className = "field is-grouped is-grouped-right">
          /* box showing all comments for a specific post */
          <div className = "Comment-box control box">
             {props.post.comments.map((comment) => {
                 return (
                   <article class="media">
                     <div class="media-content">
                       <div class="content">
                         <p>
                           <i>{comment.authUname}</i>
                           <br>{comment.postText}</br>
                           <small>{comment.postDate}</small>
                         </p>
                       </div>
                     </div>
                   </article>
                 );
             })}
          </div>
          /*
           * The 'Media Object' layout imported from Bulma is used here
           * https://bulma.io/documentation/layout/media-object/'
           * comment box to make a new comment under window display of forum
           */
          <article class="media">
            <div class="media-content">
              <div class="field">
                <p class="control">
                  <textarea class="textarea">
                    <form>
                      <input
                        type='text'
                        id='title'
                        placeholder='Enter comment'
                        onChange={handleCommentChange}/>
                    </form>
                  </textarea>
                </p>
              </div>
              <div class="field">
                <p class="control">
                  <button class="button" onClick = {handleClick}>Post comment</button>
                </p>
              </div>
            </div>
          </article>
        </div>
    );
};

export default CommentController;
