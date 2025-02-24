import { configureStore } from "@reduxjs/toolkit";
import { counterReducer } from "./counterSlice";
import { productReducer } from "./ProductSlice";

export let store = configureStore({
    reducer:{
        myCounter:counterReducer,
        myProduct: productReducer
    }
})


// reducer => slices