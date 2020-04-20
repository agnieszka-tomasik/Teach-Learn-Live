import React, { useState } from 'react';
import './Forum.css';
import ForumList from './ForumList.js';
import CreatePost from './CreatePost';
import ForumPost from './ForumPost';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector, ReactReduxContext } from 'react-redux';
import { WithBanner } from '../../components/Banner/index.js';
import { Switch, Route, Link } from 'react-router-dom';

const ForumPage = (props) => {
    const { id } = useParams();
    const post = useSelector(state => state.forum.posts.find(p => p._id === id));
    const [selected, setSelected] = useState(post);
    const {authenticated, isAdmin, isMod} = useSelector(store => ({
        authenticated: store.user.authenticated,
        isAdmin: store.user.profile.isAdmin,
        isMod: store.user.profile.isMod
    }));

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

    /************ Renders the forum page consisting of a list of the forum posts and a dynamic main box ************/
    return (
        <div style={{ padding: '1rem' }}>
            <div className="forum">
                <div className="left-side">
                    <ForumList />
                    <Link className="button" to="/forum/new/">Add a new post</Link>
                    {authenticated && (isMod || isAdmin) && <Link className="button" to="/forum/mod/">Moderate Forum</Link>}
                </div>

                <div className="right-side">
                    <div className="forum-body-container">
                        <Switch>
                            <Route exact path="/forum/" component={DefaultPage}/>
                            <Route path="/forum/new/" component={CreatePost}/>
                            <Route path="/forum/:id/" component={ForumPost}/>
                        </Switch>
                    </div>
                </div>

            </div>
        </div>
    );
}

const DefaultPage = () => <div className="default-forum-main" >
    Select a post to read or create a new post.
                    </div>;
export default WithBanner(ForumPage);