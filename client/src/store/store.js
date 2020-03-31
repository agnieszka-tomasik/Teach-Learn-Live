// store.js
import axios from 'axios';
import React, { useEffect } from 'react'
import { Provider } from 'react-redux';
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import cart from './cartSlice';
import forum, { populateForum } from './forumSlice';
import course, { populateCourses } from './courseSlice';
import user, { authenticated } from './userSlice';


// AS THE CODE STANDS RIGHT NOW: two reducers, one for adding / removing courses,
// and one for checking if the user is logged in or not

// the initial state assumes that the user is logged out, authenticated = false

/**
 * Please see https://redux-toolkit.js.org/tutorials/intermediate-tutorial
 */

// reducers specify how the app's state changes in response to actions sent to the store
// const[state, dispatch] = useReducer(reducer, initialArg, init);
// alternative to useState
// accepts a reducer of type (state, action) => newState
// returns the current state paired with a dispatch method
// const MyContext = React.createContext(defaultValue);
// When React renders a component that subscribes to this Context
// object it will read the current context value from the closest
// matching Provider above it in the tree
// the defaultValue is only used when a component does not have
// a matching Provider above it in the tree
const rootReducer = combineReducers({
    cart,
    user,
    course,
    forum
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
