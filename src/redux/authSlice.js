import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "authSlice",
  initialState: {
    loggedInUser: null,
    // firstName: "",
    // lastName: "",
  },
  reducers: {
    setLoggedInUser: (state, action) => {
      state.loggedInUser = action.payload;
    },
    setFirstName: (state, action) => {
      state.firstName = action.payload;
    },
    setLastName: (state, action) => {
      state.lastName = action.payload;
    },
    updateLoggedInUser: (state, action) => {
      state.loggedInUser = { ...state.loggedInUser, ...action.payload };
    },
    updateLoggedInUserFavorites: (state, action) => {
      state.loggedInUser.favorites.push(action.payload);
    },
  },
});

export const { setLoggedInUser, setFirstName, setLastName } = authSlice.actions;
export const selectLoggedInUser = (state) => state.authSlice.loggedInUser;

export const selectLoggedInUserFavorites = (state) =>
  state.authSlice.loggedInUser?.favorites || [];
export default authSlice.reducer;
