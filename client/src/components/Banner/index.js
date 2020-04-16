import React from 'react';
import { Link } from 'react-router-dom';

const defaultLinks = [
    { path: '/home', name: 'Home' },
    { path: '/courses', name: 'Courses' }
]
function Banner(props) {
    const links = props.links || defaultLinks;
    return <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
            <Link to="/home" className="navbar-item">
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
                    {links.map(({ path, name }) => <Link key={path} to={path} className="navbar-item">{name}</Link>)}
                </div>
            </div>
        </div>
    </nav>
}

export function WithBanner(Component, links) {
    return (p) => <>
        <Banner links={links} />
        <Component {...p}></Component>
    </>;
}

export default Banner;