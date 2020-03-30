// store.js
import React from 'react'
import {Provider} from 'react-redux';
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


const stateReducer = (state = initialState, action) => {
    console.log(action);
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

const store = createStore(stateReducer);

const StateProvider = ({ children }) => {
    return <Provider store={store}>{children}</Provider>;
};

export { store, StateProvider }
