import React from 'react';

/* component used in ForumPost.js to create a comment list */
const Comment = (props) => {
    return (
      <li className = "Comment-box" key = {props.data._id} >
        <article class="media">
          <div class="media-content">
            <div class="content">
              <p>
                <i>{props.data.authUname}</i>
                <br>{props.data.postText}</br>
                <small>{props.data.postDate}}</small>
              </p>
            </div>
          </div>
        </article>
      </li>
    );
}

export default Comment
