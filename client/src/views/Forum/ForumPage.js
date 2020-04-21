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
    const [filter, setFilter] = useState("");
    const {authenticated, isAdmin, isMod} = useSelector(store => ({
        authenticated: store.user.authenticated,
        isAdmin: store.user.profile.isAdmin,
        isMod: store.user.profile.isMod
    }));

    /************ Renders the forum page consisting of a list of the forum posts and a dynamic main box ************/
    return (
        <div style={{ padding: '1rem' }}>
            <div className="forum">
                <div className="left-side">
                    <input type="text" className="search-input" value={filter}
                        placeholder="Search Forum Posts by Title." onChange={(e) => { setFilter(e.target.value); }} />
                    <ForumList filter={filter}/>
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

const DefaultPage = () =>
  <div className="default-forum-main">
    <article className="message is-dark">
      <div className="message-header">
        <p>Welcome to the forum!</p>
      </div>
      <div className="message-body">See what others have been thinking. Share your insights by starting a conversation or commenting on another post.</div>
    </article>
  </div>

export default WithBanner(ForumPage);
