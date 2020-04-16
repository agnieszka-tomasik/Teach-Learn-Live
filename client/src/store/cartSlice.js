import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        courseList: [],
        count: 0,
        total: 0
    },
    reducers: {
        addToCart(state, action) {
            const course = action.payload

            state.courseList.push(course);
            state.count++;
            state.total += course.price;
        },
        removeFromCart(state, action) {
            const course_id = action.payload;
            const i = state.courseList.findIndex(c => c._id === course_id);
            const course = state.courseList[i]; 

            state.courseList.splice(i, 1);
            state.count--;
            state.total -= course.price;
        }
    }
})

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer