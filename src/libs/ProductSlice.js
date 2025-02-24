import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

let initialState = {
    productArr:[],
    loading:false,
    error:null
}

async function getProducts() {
    let {data} = await axios.get('https://ecommerce.routemisr.com/api/v1/products')
    return data.data
}
export let fetchProducts = createAsyncThunk('products/getProducts',getProducts)

let productSlice = createSlice({
    name:'products',
    initialState,
    extraReducers:(builder)=>{
        builder.addCase(fetchProducts.fulfilled,(state,action)=>{
            state.productArr = action.payload
            state.loading = false
            state.error = null
        }),
        builder.addCase(fetchProducts.pending,(state)=>{
            state.loading = true
            state.error = null
        }),
        builder.addCase(fetchProducts.rejected,(state,action)=>{
            state.error = action.error.message
            state.loading = false
        })
    }
})

export let productReducer = productSlice.reducer