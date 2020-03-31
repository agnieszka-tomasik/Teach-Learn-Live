import { createSlice } from '@reduxjs/toolkit'

const courseSlice = createSlice({
    name: 'course',
    initialState: {
        availableCourses: [],
    },
    reducers: {
        populateCourses(state, action) {
            // TODO -- Link with the backend database
            // by having an async call to populate initialState.
            state.availableCourses = action.payload
        }
    }
});

export const { populateCourses } = courseSlice.actions;
export default courseSlice.reducer;