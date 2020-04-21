import { createSlice } from '@reduxjs/toolkit'

const blogSlice = createSlice({
    name: 'blog',
    initialState: {
        posts: [],
    },
    reducers: {
        populateBlog(state, action) {
            state.posts = action.payload
        }
    }
});

export const { populateBlog} = blogSlice.actions;
export default blogSlice.reducer;