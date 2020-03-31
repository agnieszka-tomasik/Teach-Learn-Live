import React from 'react';
import ReactDOM from 'react-dom';
import './App.sass'
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import data from './data';
import axios from 'axios';

axios.get('/initdata')
            .then(response => {
                axios.get('/admin/users/userslist')
                    .then(res => {
                        axios.get('/admin/blog/posts')
                            .then(resb => {
                                axios.get('/admin/newsletter/emails')
                                    .then(resn =>{
                                        ReactDOM.render(
                                            <Router>
                                                <App 
                                                    data = {data}
                                                    courses = {response.data.courses || []}
                                                    posts = {response.data.posts || []}
                                                    users = {res.data || []}
                                                    blogPosts = {resb.data || []}
                                                    emails = {resn.data || []}
                                                />
                                            </Router>, document.getElementById('root')
                                        ); 
                                    }).catch(e => {
                                        console.log(`Init fail ${e}`);
                                    });
                            }).catch(e => {
                                console.log(`Init fail ${e}`);
                            });    
                    }).catch(e => {
                        console.log(`Init fail ${e}`);
                    });
            }).catch(e => {
                console.log(`Init fail ${e}`);
            });

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
