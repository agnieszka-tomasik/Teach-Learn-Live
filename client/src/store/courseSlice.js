import { createSlice } from '@reduxjs/toolkit'

const courseSlice = createSlice({
    name: 'course',
    initialState: {
        // TODO -- Link with the backend database
        // by having an async call to populate initialState.
        availableCourses: [
            {
                course_id: 1,
                title: "Put class name here",
                description: "Put class description here",
                traditional: "Put remaining seat number here.",
                online: "Put remaining seat number here.",
                schedule: "Put date and time of class here.",
                price: 100
            },
            {
                course_id: 2,
                title: "Put class name here",
                description: "Put class description here",
                traditional: "Put remaining seat number here.",
                online: "Put remaining seat number here.",
                schedule: "Put date and time of class here.",
                price: 100
            }
        ],
    },
    reducers: {

    }
});

export default courseSlice.reducer;