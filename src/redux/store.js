import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import filterSlice from './filterSlice';

export const store = configureStore({
  reducer: {
    authSlice,
    filterSlice,
  },
});
