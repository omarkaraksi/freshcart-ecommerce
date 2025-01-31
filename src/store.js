import { configureStore } from "@reduxjs/toolkit";
import { counterReducer } from "./Slices/CounterSlice";

export let store = configureStore({
    reducer: {
        counter: counterReducer,
    },
});