// store.js
import React, { createContext, useReducer } from 'react'
import ReactDOM from 'react-dom';
// import { Provider } from 'react-redux';
import { addToCart, removeFromCart } from './actions.js'
import { createStore } from 'redux'

// AS THE CODE STANDS RIGHT NOW: two reducers, one for adding / removing courses,
// and one for checking if the user is logged in or not

// the initial state assumes that the user is logged out, authenticated = false
const initialState = {
    courses: [
        {
            course_id: 1,
            title: "Put class name here",
            description: "Put class description here",
            traditional: "Put remaining seat number here.",
            online: "Put remaining seat number here.",
            schedule: "Put date and time of class here.",
            price: "Put price of course here."
        },
        {
            course_id: 2,
            title: "Put class name here",
            description: "Put class description here",
            traditional: "Put remaining seat number here.",
            online: "Put remaining seat number here.",
            schedule: "Put date and time of class here.",
            price: "Put price of course here."
        }
    ],
    authenticated: false,
    addedCourses:[],
    count: 0,
    total: 0
}

// const store = createStore(cartReducer)
// const Provider = store

const cartReducer = (state = initialState, action) => {
    if(action.type === 'AUTHENTICATED'){
        return {...state, authenticated: true}
    }
    if(action.type === 'LOGOUT'){
        return {...state, authenticated: false}
    }
    if(action.type === 'ADD_TO_CART' && state.authenticated === true){
        // saves the course used in the action as addedCourse
        // course is arbitrary, gives a temp variable to an entity in courses
        let addedCourse = state.courses.find(course => course.course_id === action.courseID)
        let newCount = state.count + 1
        let newTotal = state.total + addedCourse.price
        return {
            ...state,
            addedCourses: [...state.addedCourses, addedCourse],
            count: newCount,
            total: newTotal
        }
    }
    if(action.type === 'REMOVE_FROM_CART' && state.authenticated === true){
        let courseToRemove = state.addedCourses.find(course => course.course_id === action.courseID)
        let newCollection = state.addedCourses.filter(course => course.course_id !== action.courseID)
        let newCount = state.count - 1
        let newTotal = state.total - courseToRemove.price
        return {
            ...state,
            addedCourses: newCollection,
            count: newCount,
            total: newTotal
        }
    }
    else{
        return state
    }
}

// const MyContext = React.createContext(defaultValue);
// When React renders a component that subscribes to this Context
// object it will read the current context value from the closest
// matching Provider above it in the tree
// the defaultValue is only used when a component does not have
// a matching Provider above it in the tree
const store = createContext(initialState)
const { Provider } = store

const StateProvider = ({ children }) => {
    // reducers specify how the app's state changes in response to actions sent to the store
    // const[state, dispatch] = useReducer(reducer, initialArg, init);
    // alternative to useState
    // accepts a reducer of type (state, action) => newState
    // returns the current state paired with a dispatch method
    const [state, dispatch] = useReducer((state, action) => {
        switch (action.type) {
            case 'AUTHENTICATED':
                return {...state, authenticated: true};
            case 'LOGOUT':
                return {...state, authenticated: false};
            default:
                throw new Error(`Invalid action was received: ${action}`);
        };
    }, initialState);

    // All Consumers that are descendants of a Provider will re-render whenever
    // the Provider's value prop changes value
    return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

//ReactDOM.render(<Provider store = {store}><App /></Provider>, document.getElementById('root'))
export { store, StateProvider }
