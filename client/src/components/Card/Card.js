import React from 'react';

import './Card.css';

function Card() {
    return (
        <div class="card-wrapper">

            <div class="card">
                <p class="card-header-title is-centered">Lorem Ipsum</p>
                <div class="card-content">
                    <div class="content">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Phasellus nec iaculis mauris. <a>@bulmaio</a>.
      <a href="#">#css</a> <a href="#">#responsive</a>
                        <br />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card;