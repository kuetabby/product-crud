import { configureStore } from '@reduxjs/toolkit'

import productsReducer from './productsSlice'
import productReducer from './productSlice'

export const store = configureStore({
    reducer: {
        product: productReducer,
        products: productsReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
})