// import the createSlice form redux toolkit 
import { createSlice } from '@reduxjs/toolkit'

// create a new slice 
const cartSlice = createSlice({
    name: "cart",
    initialState: {
        products: [],
        quantity: 0,
        total: 0,
    },
    reducers: {
        addProduct: (state, action) => {
            const index = state.products.findIndex(
                item => item._id === action.payload._id
            )
            if (index >= 0) {
                state.products[index].quantity += 1
                state.total += action.payload.price * action.payload.quantity
            } else {
                const tempProduct = { ...action.payload, quantity: 1 }
                state.products.push(tempProduct)
                state.quantity += 1
                state.total += action.payload.price
            }
        },

        removeProduct: (state, action) => {
            const newCart = state.products.filter(item => item._id !== action.payload._id)
            state.total -= action.payload.price * action.payload.quantity;
            state.quantity -= 1
            state.products = newCart
        },
        clearCart: (state, action) => {
            state.products = []
            state.quantity = 0
            state.total = 0
            console.log("clearCart run")
        },
        decreaseQuantity: (state, action) => {
            const index = state.products.findIndex(item => item._id === action.payload._id)

            if (state.products[index].quantity > 1) {
                state.products[index].quantity -= 1
                state.total -= action.payload.price
            } else if (state.products[index].quantity === 1) {
                const newCart = state.products.filter(item => item._id !== action.payload._id)
                state.total -= action.payload.price * action.payload.quantity;
                state.quantity -= 1
                state.products = newCart
            }
        },
        increaseQuantity: (state, action) => {
            const index = state.products.findIndex(item => item._id === action.payload._id)
            state.products[index].quantity += 1
            state.total += action.payload.price
        }
    }
})

export const { addProduct, removeProduct, clearCart, decreaseQuantity, increaseQuantity } = cartSlice.actions;
export default cartSlice.reducer;