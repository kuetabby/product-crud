import { createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = { data: [], loading: false, error: '' }

export const getProducts = createAsyncThunk('products/getProducts', async () => {
    try {
        const request = await axios.get(
            `https://crudcrud.com/api/${process.env.REACT_APP_API_KEY}/products`
        )
        const response = await request.data
        return response
    } catch (error) {
        return error
    }
})

export const deleteProduct = createAsyncThunk('products/deleteProduct', async (id, thunkApi) => {
    try {
        const request = await axios.delete(
            `https://crudcrud.com/api/${process.env.REACT_APP_API_KEY}/products/${id}`
        )
        const response = await request.data
        return response
    } catch (error) {
        return error
    }
})

export const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getProducts.pending, (state) => {
                return {
                    ...state,
                    loading: true,
                }
            })
            .addCase(
                getProducts.fulfilled,
                (state, { payload }) => {
                    return {
                        ...state,
                        loading: false,
                        data: payload,
                    }
                }
            )
            .addCase(getProducts.rejected, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    error: action.error.message,
                }
            })
        builder
            .addCase(deleteProduct.pending, (state) => {
                return {
                    ...state,
                    loading: true
                }
            })
            .addCase(deleteProduct.fulfilled, (state) => {
                return {
                    ...state,
                    loading: false
                }
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    error: action.error.message,
                }
            })
    },
})

export default productsSlice.reducer
