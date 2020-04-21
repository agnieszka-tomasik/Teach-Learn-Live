import React, { useState } from 'react';
import './Forum.css';
import ForumList from './ForumList.js';
import ForumPost from './ForumPost';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector, ReactReduxContext } from 'react-redux';
import { WithBanner } from '../../components/Banner/index.js';
import { Switch, Route, Link } from 'react-router-dom';

const ForumPage = (props) => {
    const { id } = useParams();
    const post = useSelector(state => state.blog.posts.find(p => p._id === id));
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
                        placeholder="Search Blog Posts by Title." onChange={(e) => { setFilter(e.target.value); }} />
                    <ForumList filter={filter}/>
                </div>
                <div className="right-side">
                    <div className="forum-body-container">
                        <Switch>
                            <Route exact path="/blog/" component={DefaultPage}/>
                            <Route path="/blog/:id/" component={ForumPost}/>
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
        <p>Welcome to the blog!</p>
      </div>
      <div className="message-body">Check out whats been happening on the blog!</div>
    </article>
  </div>

export default WithBanner(ForumPage);
