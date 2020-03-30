import React, { useState } from 'react';
import './Forum.css';
import ForumSubmit from './ForumSubmit';
import data from '../../data';

const Forum = () => {
    const [newPost, setNewPost] = useState();

    if (newPost != null) {
        data.push(newPost);
        setNewPost();
    }

    const forum = data.map((post) => (
        <div>
            <div className="container is-fluid">
                <div className="Post-box control">
                    <div className="box">
                        {post.text}
                    </div>
                </div>
            </div>
            <div className="field is-grouped is-grouped-right">
                <div className="Comment-box control">
                    <input className="input is-black" type="text" placeholder="comment input" />
                </div>
                <button
                  type="button"
                  className="button is-success"
                  onClick={() => {
                        console.log('watashi ga kita');
                    }}
                >
                    Comment
                </button>
            </div>

        </div>
    ));
    return (
        <section className="hero is-primary is-bold is-fullheight">
            <div>
                {forum}
                <ForumSubmit
                  setNewPost={setNewPost}
                />
            </div>
        </section>
    );
};

export default Forum;
