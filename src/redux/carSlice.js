import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	currentCar: {}
};

export const currentCarSlice = createSlice({
	name: 'currentCar',
	initialState,

	reducers: {
		setCurrentCar: (state={}, action) => {
			state.currentCar = action.payload
		}
	}
})

export const {setCurrentCar} = currentCarSlice.actions;

export default currentCarSlice.reducer;