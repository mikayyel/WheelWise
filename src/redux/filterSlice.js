import { createSlice } from '@reduxjs/toolkit';
import { prices } from '../components/FilterCars/helper';

const initialState = {
	fromYear: '',
	toYear: '',
	fromMileage: '',
	toMileage: '',
	fromHorsePower: '',
	toHorsePower: '',
	fromEngine: '',
	toEngine: '',
	selectedBrand: '',
	selectedModel: '',
	selectedTransmission: '',
	selectedFuelType: '',
	priceRange: [prices.MIN, prices.MAX],
};

export const filterSlice = createSlice({
	name: 'filters',
	initialState,

	reducers: {
		handleFromChangeYear: (state, { payload }) => {
			state.fromYear = payload
			if (state.toYear && payload >= state.toYear) {
				state.toYear = ""
			}
		},

		handleToChangeYear: (state, { payload }) => {
			state.toYear = payload
		},

		handleFromChangeMileage: (state, { payload }) => {
			state.fromMileage = payload
			if (state.toMileage && payload >= state.toMileage) {
				state.toMileage = "";
			}
		},

		handleToChangeMileage: (state, { payload }) => {
			state.toMileage = payload
		},

		handleFromChangeHorsePower: (state, { payload }) => {
			state.fromHorsePower = payload
			if (state.toHorsePower && payload >= state.toHorsePower) {
				state.toHorsePower = "";
			}
		},

		handleToChangeHorsePower: (state, { payload }) => {
			state.toHorsePower = payload
		},

		handleFromChangeEngine: (state, { payload }) => {
			state.fromEngine = payload
			if (state.toEngine && payload >= state.toEngine) {
				state.toEngine = "";
			}
		},

		handleToChangeEngine: (state, { payload }) => {
			state.toEngine = payload
		},

		handleBrandChange: (state, { payload }) => {
			state.selectedBrand = payload;
			state.selectedModel = "";
		},

		handleModelChange: (state, { payload }) => {
			state.selectedModel = payload;
		},

		handleTransmissionChange: (state, { payload }) => {
			state.selectedTransmission = payload
		},

		handleFuelTypeChange: (state, { payload }) => {
			state.selectedFuelType = payload
		},

		handlePriceChange: (state, { payload }) => {
			state.priceRange = payload
		},

		handleReset: (state) => {
			return initialState
		}
	}
})

export const { handleFromChangeYear,
	handleToChangeYear,
	handleFromChangeMileage,
	handleToChangeMileage,
	handleFromChangeHorsePower,
	handleToChangeHorsePower,
	handleFromChangeEngine,
	handleToChangeEngine,
	handleBrandChange,
	handleModelChange,
	handleTransmissionChange,
	handleFuelTypeChange,
	handlePriceChange,
	handleReset } = filterSlice.actions;

export default filterSlice.reducer;