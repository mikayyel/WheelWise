import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import filterSlice from './filterSlice';
import sellingCarSlice from "./sellingCar";

export const store = configureStore({
  reducer: {
    authSlice,
    filterSlice,
    sellingCarSlice,
  },
});
