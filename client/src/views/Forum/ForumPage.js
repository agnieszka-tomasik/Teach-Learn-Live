import React, { useState } from 'react';
import './Forum.css';
import ForumList from './ForumList.js';
import ForumMain from './ForumMain.js';
import axios from 'axios';

const ForumPage = (props) => {

    /********** Hiding the forum list *********
    ** This code will be finished in the future
    ** and will allow the user to click a button
    ** that hides the forum list so the contents
    ** of the main box fill the entire screen.
    */

    // const [left, setLeft] = useState(true);

    //const [moving, setMoving] = useState(false);
    
    // const shift = () => {
    //     /****** TODO: animation to shift the post list depending on the left state hook ******/
    // };

    // const changeLeft = () => {
    //     if(!moving){
    //         setLeft( prev => !prev );

    //         setMoving(true);

    //         shift();

    //         setMoving(false);
    //     }
    // };

    /** Contains the data corresponding to what should be in the main box of the forum page **/
    const [mainContent, setMainContents] = useState(0);

    /** Wrapper **/
    const updateMain = (newContents) => { setMainContents(newContents) };


    /** Contains the data for all of the forum posts **/
    const [data, setData] = useState( props.posts );


    /*************************** Axios post to create a new comment ************************************/
    const addComment = (text, orig) => {

        axios.post('/forum/comment',
        {post: orig, text: text} )
        .then( response => {
            if (response.status === 200) {
                setData(response.data);
                setMainContents(response.data.filter( item => item._id === orig._id )[0] )
            } else {
                console.log("Comment failed");
            }
        }).catch(e => {
            console.log(`Comment failed with error: ${e}`);
        });

    }

    /*************************** Axios post to create a new post ************************************/
    const createPost = (title, body) => {

        axios.post('/forum',
        {postTitle: title, postText: body} )
        .then( response => {
            if (response.status === 200) {
                setData(response.data);
                setMainContents(0);
            } else {
                console.log(`Failed to add post: ${response.data}`);
            }
        }).catch(err => {
            console.log(`Failed to add post with error: ${err}`);
        });

    }


    /************ Renders the forum page consisting of a list of the forum posts and a dynamic main box ************/
    return (
        <div>
            
            <div className = "left-side">

                <ForumList 
                data = {data} 
                updateMain = {updateMain} />

                <button
                onClick = { () => { setMainContents(-1) } }
                className = "add-new-post" >
                    Add a new post
                </button>

                {/*<button onClick = {changeLeft} className = "toggle-left" /> */}

            </div>

            <div className = "right-side">

                <ForumMain 
                contentData = {mainContent}
                createPost = {createPost} 
                addComment = {addComment} />

            </div>

        </div>
    );
}

export default ForumPage;