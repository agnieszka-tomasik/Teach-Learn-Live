import React from 'react';
import { Link } from 'react-router-dom';

function Banner(props) {
    return <div>
        <Link to="home">
            <img width="100px" height="100px" src={"/tll_logo_no_bg.svg"} alt="Teach Leave Live" />
        </Link>
    </div>
}

export function WithBanner(Component) {
    return (p) => <div>
        <Banner />
        <Component {...p}></Component>
    </div>;
}

export default Banner;