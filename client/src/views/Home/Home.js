import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import axios from 'axios';
import { store } from '../../store/store';

function Home() {

    const [message, setMessage] = useState(null);
    const { dispatch, state } = useContext(store);

    const logoutAction = () => {
        axios.post('/logout').then(response => {
            if (response.status === 200) {
                dispatch({ type: 'LOGOUT' });
            } 
        });
    }
    const submit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        axios.post('/signup-newsletter', Object.fromEntries(formData))
            .then(response => {
                if (response.status === 200) {
                    setMessage({message: "Sign up successful!", class: "is-success"});

                } else {
                    setMessage({message: "Wasn't able to sign up", class: "is-danger"});
                }
            })
            .catch(e => {
                setMessage({message: "Wasn't able to sign up", class: "is-danger"});
            })
    };
    return (
        <div>
            <section className="hero is-primary is-bold is-fullheight">
                <div className="hero-head">
                    <nav className="navbar">
                        <div className="container">
                            <div className="navbar-brand">
                                <img className="nav-logo navbar-item" src={"/tll_logo_no_bg.svg"} alt="Teach Leave Live" />

                                <span className="navbar-burger burger" data-target="navbarMenuHeroA">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </span>
                            </div>
                            <div id="navbarMenuHeroA" className="navbar-menu">
                                <div className="navbar-end">
                                    <Link to="courses" className="navbar-item">Courses</Link>
                                    {state.authenticated && <Link to="forum" className="navbar-item">Forum</Link>}
                                    {!state.authenticated && <Link to="register" className="navbar-item">Register</Link>}
                                    {!state.authenticated && <Link to="login" className="navbar-item">Login</Link>}
                                    {state.authenticated && <a href="#" className="navbar-item" onClick={logoutAction}>Logout</a>}
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
                                    <input className="is-one-fifth button is-link" value="Sign Up" type="submit" />
                                </div>
                            </div>
                        </form>
                        {message && <p className={message.class}>{message.message}</p>}
                    </div>
                </div>
                <div className="hero-foot">

                </div>
            </section>
        </div>
    );
}

export default Home;
