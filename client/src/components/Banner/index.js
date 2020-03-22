import React from 'react';

function Banner(props) {
    return <div>Teach. Leave. Learn.</div>
}

export function WithBanner(Component) {
    return (p) => <div>
        <Banner/>
        <Component {...p}></Component>
    </div>;
}

export default Banner;