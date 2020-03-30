import React from 'react';
import ReactDOM from 'react-dom';
import './App.sass';
import { BrowserRouter as Router } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import App from './App';
import data from './data';

ReactDOM.render(
    <Router>
        <App data={data} />
    </Router>, document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
