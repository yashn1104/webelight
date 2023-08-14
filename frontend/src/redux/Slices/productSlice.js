import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    products:[]
}


const productSlice = createSlice({
    name:'product',
    initialState,
    reducers:{
        addProducts(state,action){
            const newProduct = action.payload.id;
            const existingProduct = state.products.find(product=>product.id === newProduct);
            if (existingProduct) {
                existingProduct.quantity++;                                 
            } else {
                state.products.push(action.payload)
            }
        }
    }
})


export const {addProducts} = productSlice.actions
export default productSlice.reducer;