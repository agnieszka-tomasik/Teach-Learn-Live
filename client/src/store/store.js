// store.js
import axios from 'axios';
import React, { useEffect } from 'react'
import { Provider } from 'react-redux';
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import cart from './cartSlice';
import payment from './paymentSlice';
import forum, { populateForum } from './forumSlice';
import course, { populateCourses } from './courseSlice';
import user, { authenticated } from './userSlice';
import admin from './adminSlice';

/**
 * Please see https://redux-toolkit.js.org/tutorials/intermediate-tutorial
 */

const rootReducer = combineReducers({
    cart,
    payment,
    user,
    course,
    forum,
    admin
});

const store = configureStore({
    reducer: rootReducer
});

const StateProvider = ({ children }) => {
    useEffect(() => {
        axios.get('/session').then((response) => {
            if (response.data && response.data.valid) {
                store.dispatch(authenticated(response.data));
            } else {
                console.error(response.data);
            }
        });

        // TODO split store hydration to respective components.
        axios.get('/initdata').then((response) => {
            if (response.status === 200) {
                store.dispatch(populateCourses(response.data.courses));
                store.dispatch(populateForum(response.data.posts));
            }
        })
    }, []);
    return <Provider store={store}>{children}</Provider>;
};

export { store, StateProvider }
