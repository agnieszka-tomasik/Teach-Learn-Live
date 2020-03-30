import React, {useState} from 'react';
import Forum from './Forum.js';
import CreatePost from './CreatePost';

const ForumMain = (props) => {
    const contentData = props.contentData;
    let contents;

    if(contentData === -1) {
        /******* create forum post interface *******/
        contents = <CreatePost createPost = {props.createPost} />;
    }
    else if(contentData) {
        /******* Set contents to  corresponding Forum *******/

        contents = <Forum
                    data = {contentData}
                    addComment = { props.addComment } />;
    }
    else {
        /*  Default case for having no contents. Also when ************
        **  the contentId does not correspond to valid post **********
        ***************************************************************/

        contents =  <div className = "default-forum-main" >
                        Select a post to read or create a new post.
                    </div>;
    }

    return (
        <div className = "forum-body-container" >
            {contents}
        </div>
    );
}

export default ForumMain;