// add course to cart
export const addToCart = (id) => {
    return {
        type: 'ADD_TO_CART',
        courseID: id
    }
}
// remove course from cart
export const removeFromCart = (id) => {
    return {
        type: 'REMOVE_FROM_CART',
        courseID: id
    }
}
