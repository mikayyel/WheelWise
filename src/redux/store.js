import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import currentCarReducer from './carSlice';

export const store = configureStore({
  reducer: {
    authSlice,
    currentCar: currentCarReducer,
  },
});
