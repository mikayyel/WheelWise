import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const initialState = {
  userId: '',
  id: `${uuidv4()}`,
  make: '',
  model: '',
  year: '',
  color: '',
  description: '',
  condition: 'new',
  fuelType: '',
  mileage: '',
  transmission: '',
  engine: '',
  horsepower: '',
  price: '',
  location: [40.1872, 44.5152],
  features: [],
  image: []
};

export const sellingCarSlice = createSlice({
  name: 'sellingCar',
  initialState,
  reducers: {
    handleUserIdChange: (state, { payload }) => { state.userId = payload },
    handleIdChange: (state, { payload }) => { state.id = payload },
    handleChangeMake: (state, { payload }) => { state.make = payload },
    handleChangeModel: (state, { payload }) => { state.model = payload },
    handleChangeYear: (state, { payload }) => { state.year = payload },
    handleChangeColor: (state, { payload }) => { state.color = payload },
    handleChangeDescription: (state, { payload }) => { state.description = payload },
    handleChangeCondition: (state, { payload }) => { state.condition = payload },
    handleChangeFuelType: (state, { payload }) => { state.fuelType = payload },
    handleChangeMileage: (state, { payload }) => { state.mileage = payload },
    handleChangeTransmission: (state, { payload }) => { state.transmission = payload },
    handleChangeEngine: (state, { payload }) => { state.engine = payload },
    handleChangeHorsePower: (state, { payload }) => { state.horsepower = payload },
    handleChangePrice: (state, { payload }) => { state.price = payload },
    handleChangeLocation: (state, { payload }) => { state.location = payload },
    handleChangeFeatures: (state, { payload }) => { state.features = payload },
    handleChangeImage: (state, { payload }) => { state.image.push(payload) },
    handleDeleteImage: (state, action) => {
      const index = action.payload;
      state.image = state.image.filter((_, i) => i !== index);
    },
    handleReset: (state) => {
      return initialState
    }
  }
})

export const { handleUserIdChange,
  handleIdChange,
  handleChangeMake,
  handleChangeModel,
  handleChangeYear,
  handleChangeColor,
  handleChangeDescription,
  handleChangeCondition,
  handleChangeFuelType,
  handleChangeMileage,
  handleChangeTransmission,
  handleChangeEngine,
  handleChangeHorsePower,
  handleChangePrice,
  handleChangeLocation,
  handleChangeFeatures,
  handleChangeImage,
  handleDeleteImage,
  handleReset } = sellingCarSlice.actions;

export default sellingCarSlice.reducer;