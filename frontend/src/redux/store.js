import { configureStore } from "@reduxjs/toolkit";
import  productSlice  from "./Slices/productSlice";
import userSlice from "./Slices/userSlice";

const store = configureStore({
  reducer: {
    products: productSlice,
    users: userSlice
  },
});
export default store;
