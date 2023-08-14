import { configureStore } from '@reduxjs/toolkit';
import productreducer from "./Slices/productSlice"


const store = configureStore({
    reducer:{
        product:productreducer
    }
})
export default store