import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
    return (
        <div className = "header">
            {/* Company name, left-centered */}
            <Link className = "nav-title" to="/">Teach. Leave. Live.</Link>
            {/* Page Links */}
            <div className = "nav-items">
                <Link className = "nav-link" to='/'>Courses</Link>
                <Link className = "nav-link" to='/cart'>Shopping Cart</Link>
            </div>
        </div>
    )
};

export default NavBar;
