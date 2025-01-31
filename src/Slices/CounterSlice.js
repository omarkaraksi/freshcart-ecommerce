import { createSlice } from "@reduxjs/toolkit";

let initialState = {count:0,userName:'omar'}

let counterSlice = createSlice({
    name: "counterSLice",
    initialState,
    reducers: {
        increment: (state) =>{ state.count++ },
        decrement: (state) => {state.count--},
        incrementByAmount: (state,action) => {state.count += action.payload}
    }
})

export let {increment,decrement,incrementByAmount} = counterSlice.actions
export let counterReducer = counterSlice.reducer
