import React from 'react';
import ReactDOM from 'react-dom';
import './App.sass'
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import data from './data';
import axios from 'axios';

axios.get('/admin/courses/courseslist')
            .then(response => {
                                courses = {response.data || []}
                            />
                        </Router>, document.getElementById('root')
                    );
                }
            }).catch(e => {
                console.log(`Init fail ${e}`);
            });

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
