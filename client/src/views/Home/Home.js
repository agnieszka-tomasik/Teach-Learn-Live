import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
    return (
        <div>
            <section className="hero is-primary is-bold is-fullheight">
                <div className="hero-head">
                    <nav className="navbar">
                        <div className="container">
                            <div className="navbar-brand">
                                <img className="nav-logo navbar-item" src={"/tll_logo_no_bg.svg"} alt="Teach Leave Live" />

                                <span class="navbar-burger burger" data-target="navbarMenuHeroA">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </span>
                            </div>
                            <div id="navbarMenuHeroA" class="navbar-menu">
                                <div class="navbar-end">
                                    <Link to="courses" className="navbar-item">Courses</Link>
                                    <Link to="register" className="navbar-item">Register</Link>
                                    <Link to="login" className="navbar-item">Login</Link>
                                </div>
                            </div>
                        </div>
                    </nav>
                </div>
                <div className="hero-body">
                    <div className="container has-text-centered">
                        <h1 className="title">Teach. Leave. Live.</h1>
                        <h2 className="subtitle">Teach your heart out, leave work at work, and live life with intention.</h2>
                        <div className="field">
                            <div className="sign-up control">
                                <input class="input is-medium" placeholder="email" type="email"></input>
                                <button class="is-one-fifth button is-link">Sign Up</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="hero-foot">

                </div>
            </section>
        </div>
    );
}

export default Home;
