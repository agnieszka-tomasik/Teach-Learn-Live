import { createSlice } from '@reduxjs/toolkit'
const adminSlice = createSlice({
    name: 'admin',
    initialState: {users: [], posts: [], emails: []},
    reducers: {
        populateUsers(state, action) {
            state.users = action.payload;
        },
        populatePosts(state, action) {
            state.posts = action.payload;
        },
        populateEmails(state, action) {
            state.emails = action.payload;
        }
    }
})

export const { populateUsers, populatePosts, populateEmails } = adminSlice.actions;
export default adminSlice.reducer