import React from 'react';

const OriginalPost = (props) => {
    return (
      <article class="media">
        <div class="media-content">
          <div class="content">
            <p>
              <strong>{props.data.postTitle}</strong>
              <br>
                <i>{props.data.authUname}</i>
              </br>
              <br>{props.data.postText}</br>
              <small>{props.data.postDate}}</small>
            </p>
          </div>
        </div>
      </article>
    );
}

export default OriginalPost
