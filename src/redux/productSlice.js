import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = { data: {}, loading: false, loadingUpdate: false, error: '' }

export const createProduct = createAsyncThunk('product/createProduct', async (data, thunkApi) => {
    try {
        const request = await axios({
            url: `https://crudcrud.com/api/${process.env.REACT_APP_API_KEY}/products`,
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            data,
        })
        const response = await request.data
        return response
    } catch (error) {
        return error
    }
})

export const updateProduct = createAsyncThunk('product/updateProduct', async ({ id, data }, thunkApi) => {
    try {
        const request = await axios({
            url: `https://crudcrud.com/api/${process.env.REACT_APP_API_KEY}/products/${id}`,
            method: 'put',
            headers: {
                'Content-Type': 'application/json'
            },
            data,
        })
        const response = await request.data
        return response
    } catch (error) {
        return error
    }
})

export const getProduct = createAsyncThunk('product/getProduct', async (id, thunkApi) => {
    try {
        const request = await axios.get(`https://crudcrud.com/api/${process.env.REACT_APP_API_KEY}/products/${id}`)
        const response = await request.data
        return response
    } catch (error) {
        return error
    }
})


export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        resetState: () => {
            return initialState
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createProduct.pending, (state) => {
                return {
                    ...state,
                    loading: true,
                }
            })
            .addCase(
                createProduct.fulfilled,
                (state, { payload }) => {
                    return {
                        ...state,
                        loading: false,
                        // data: payload,
                    }
                }
            )
            .addCase(createProduct.rejected, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    error: action.error.message,
                }
            })
        builder
            .addCase(getProduct.pending, (state) => {
                return {
                    ...state,
                    loading: true,
                }
            })
            .addCase(
                getProduct.fulfilled,
                (state, { payload }) => {
                    return {
                        ...state,
                        loading: false,
                        data: payload,
                    }
                }
            )
            .addCase(getProduct.rejected, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    error: action.error.message,
                }
            })
        builder
            .addCase(updateProduct.pending, (state) => {
                return {
                    ...state,
                    loadingUpdate: true,
                }
            })
            .addCase(
                updateProduct.fulfilled,
                (state, { payload }) => {
                    return {
                        ...state,
                        loadingUpdate: false,
                        // data: payload,
                    }
                }
            )
            .addCase(updateProduct.rejected, (state, action) => {
                return {
                    ...state,
                    loadingUpdate: false,
                    error: action.error.message,
                }
            })
    }
})

export const { resetState } = productSlice.actions
export default productSlice.reducer
