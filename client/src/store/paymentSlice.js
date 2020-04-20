import { createSlice } from '@reduxjs/toolkit'

const paymentSlice = createSlice({
    name: 'payment',
    initialState: {
        paid: false,
        error: {}
    },
    reducers: {
        setPaidFor(state, action) {
            state.paid = action.payload;
        },
        setError(state, action) {
            state.error = action.payload;
        }
    }
})

export const { setPaidFor, setError } = paymentSlice.actions;
export default paymentSlice.reducer
