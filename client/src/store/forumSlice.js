import { createSlice } from '@reduxjs/toolkit'

const forumSlice = createSlice({
    name: 'forum',
    initialState: {
        posts: [],
    },
    reducers: {
        populateForum(state, action) {
            state.posts = action.payload
        },
        forumPostSubmit(state, action) {
            // TODO
            // forum submit should return the JSON on success
            // state.posts.push(action.payload);
        },
        addComment(state, action) {
            // TODO
            // successfully adding a comment should update the client's state.
            // right now we send the entire post back but this is wasteful.
            state.posts = action.payload
        }
    }
});

export const { populateForum, addComment } = forumSlice.actions;
export default forumSlice.reducer;