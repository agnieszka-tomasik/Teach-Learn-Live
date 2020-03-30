import React, { useState } from 'react';
import './Forum.css';
import ForumList from './ForumList.js'
import ForumMain from './ForumMain.js'

const ForumPage = (props) => {

    const [mainContent, setMainContents] = useState(0);

    // const [left, setLeft] = useState(true);

    //const [moving, setMoving] = useState(false);

    const updateMain = (newContents) => { setMainContents(newContents) };

    const [data, setData] = useState( props.data );

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

    const addComment = (text, id) => {
        /******* Add to database *******/
        props.data
        .filter( item => item._id === id )[0]
        .comments.push( {postText: text} );

        /********* Update main contents *********/
        setData(props.data);
    }

    const createPost = (title, body) => {
        /******* Add to database *******/
        props.data.push( 
            {
                authUname: "user",
                postTitle: title ,
                postText: body,
                comments:   []
            }
            )

        /********* Update list *********/
        setData(props.data);
    }

    return (
        <div>
            
            <div className = "left-side">

                <ForumList data = {data} updateMain = {updateMain} />

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