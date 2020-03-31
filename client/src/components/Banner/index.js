import React from 'react';
import { Link } from 'react-router-dom';

function Banner(props) {

    return <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
            <Link to="home" className="navbar-item">
                <img src={"/tll_logo_no_bg.svg"} alt="Teach Leave Live" />
            </Link>

            <a role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
            </a>
        </div>

        <div id="navbarBasicExample" className="navbar-menu">
            <div className="navbar-start">
                <div className="buttons">
                    <Link to="/home" className="navbar-item">Home</Link>
                    <Link to="/courses" className="navbar-item">Courses</Link>
                </div>
            </div>
        </div>
    </nav>
}

export function WithBanner(Component) {
    return (p) => <div>
        <Banner />
        <Component {...p}></Component>
    </div>;
}

export default Banner;