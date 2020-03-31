import React from 'react';
import ForumPost from './ForumPost.js';
import CreatePost from './CreatePost';

const ForumMain = (props) => {
    const contentData = props.contentData;
    let contents;

    /** Conditional to assign proper contents to the main box
    ** of the forum page based on the input contentData
    */
    if(contentData === -1) {

        /******* create forum post interface *******/
        contents = <CreatePost createPost = {props.createPost} />;

    }
    else if(contentData) {

        /******* Set contents of main box to the corresponding ForumPost *******/
        contents = <ForumPost
                    data = {contentData}
                    addComment = { props.addComment } />;

    }
    else {

        /** Default case for having no contents **/

        contents =  <div className = "default-forum-main" >
                        Select a post to read or create a new post.
                    </div>;
    }


    /********** Render the main box of the forum page *********/
    return (
        <div className = "forum-body-container" >
            {contents}
        </div>
    );

}

export default ForumMain;