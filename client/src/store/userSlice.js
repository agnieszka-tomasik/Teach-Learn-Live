import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        authenticated: false,
        profile: {}
    },
    reducers: {
        authenticated(state, action) {
            const { user } = action.payload;
            state.authenticated = true;
            state.profile = user;
        },
        logout(state) {
            state.authenticated = false;
            state.profile = {};
        }
    },
})

export const {authenticated, logout} = userSlice.actions;
export default userSlice.reducer