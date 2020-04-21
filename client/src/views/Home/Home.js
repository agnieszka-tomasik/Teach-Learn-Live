import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import axios from 'axios';
import { logout } from '../../store/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { SocialIcon } from 'react-social-icons';
import _useToasts from '../../components/Toasts';

function Home() {
    const [message, setMessage] = useState(null);
    const {addSuccess, addError} = _useToasts();
    const { authenticated, isAdmin } = useSelector(store => ({
        authenticated: store.user.authenticated,
        isAdmin: store.user.profile.isAdmin
    }));
    const dispatch = useDispatch();

    const logoutAction = (e) => {
        e.preventDefault();
        axios.post('/logout').then((response) => {
            if (response.status === 200) {
                dispatch(logout());
            }
        });
    };
    const submit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        axios.post('/signup-newsletter', Object.fromEntries(formData))
            .then((response) => {
                if (response.status === 200) {
                    addSuccess("Sign up successful!");
                } else {
                    addError("Wasn't able to sign up.");
                }
            })
            .catch((error) => {
                addError(error.response.data);
            });
    };
    return (
        <div>
            <section className="hero is-primary is-bold is-fullheight">
                <div className="hero-head">
                    <nav className="navbar">
                        <div className="container">
                            <div className="navbar-brand">
                                <img className="nav-logo navbar-item" src="/tll_logo_no_bg.svg" alt="Teach Leave Live" />
                                <span className="navbar-burger burger" data-target="navbarMenuHeroA">
                                    <span />
                                    <span />
                                    <span />
                                </span>
                            </div>
                            <div id="navbarMenuHeroA" className="navbar-menu">
                                <div className="navbar-end">
                                    <div className="buttons">
                                        <Link to="courses" className="button is-light navbar-item">Courses</Link>
                                        {authenticated && isAdmin && <Link to="admin" className="button is-primary navbar-item">Admin</Link>}
                                        {!authenticated && <Link to="login" className="button is-light navbar-item">Login</Link>}
                                        {!authenticated && <Link to="register" className="button is-primary navbar-item"><strong>Register</strong></Link>}
                                        {authenticated && <Link to="forum" className="button is-primary navbar-item">Forum</Link>}
                                        <Link to="blog" className="button is-primary navbar-item">Blog</Link>
                                        {authenticated && <a href="#" type="button" className="button is-light navbar-item" onClick={logoutAction}>Logout</a>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </nav>
                </div>
                <div className="hero-body">
                    <div className="container has-text-centered">
                        <h1 className="title">Teach. Leave. Live.</h1>
                        <h2 className="subtitle">Teach your heart out, leave work at work, and live life with intention.</h2>


                        <form onSubmit={submit}>
                            <div className="field">
                                <div className="sign-up control">
                                    <input className="input is-medium" name="email" placeholder="email" type="email" />
                                    <input className="is-one-fifth button sign-up-btn" value="Sign Up" type="submit" />
                                </div>
                            </div>
                        </form>
                        {message && <p className={message.class}>{message.message}</p>}
                    </div>
                </div>
                <div className="hero-foot">
                    <div className="level">
                        <SocialIcon className="level-item" url="http://instagram.com/teachleavelive/" />
                        <SocialIcon className="level-item" url="http://twitter.com/teachleavelive/" />
                        <SocialIcon className="level-item" url="http://facebook.com/teachleavelive/" />
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Home;
