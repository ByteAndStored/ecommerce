import { createSlice } from "@reduxjs/toolkit";

let initialState = {
    counter:0,
    list:[],
    isLoading: true,
    fName:'Kandil'
}

let counterSlice = createSlice({
    name:'counter',
    initialState,
    reducers:{
        increase:(state)=>{
            state.counter+=1
        },
        decrease:(state)=>{
            state.counter-=1
        },
        changeName:(state)=>{
            state.fName='Mohamed'
        },
        increaseByAmount:(state,action)=>{
            console.log(action);
            state.counter+=action.payload
        },
        addMe:(state,action)=>{
            state.list.push(action.payload)
        }
    }
})

export let counterReducer = counterSlice.reducer
export let {decrease,increase,changeName,increaseByAmount,addMe} =   counterSlice.actions


// reducers => containers for group of actions ==> change states