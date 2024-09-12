import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "authSlice",
  initialState: {
    loggedInUser: null,
  },
  reducers: {
    setLoggedInUser: (state, action) => {
      state.loggedInUser = action.payload;
    },
    updateLoggedInUser: (state, action) => {
      state.loggedInUser = { ...state.loggedInUser, ...action.payload };
    },
    addNoteToUser: (state, action) => {
      state.loggedInUser.notes = [
        ...(state.loggedInUser.notes || []),
        action.payload,
      ];
    },
    deleteNoteToUser: (state, action) => {
      state.loggedInUser.notes = state.loggedInUser.notes.filter(
        (note, index) => index !== action.payload
      );
    },
    updateLoggedInUserFavorites: (state, action) => {
      if (state.loggedInUser) {
        state.loggedInUser.favorites.push(action.payload);
      }
    },
    updateLoggedInUserPhoto: (state, action) => {
      state.loggedInUser.photoURL = action.payload;
    },
  },
});

export const {
  setLoggedInUser,
  addNoteToUser,
  deleteNoteToUser,
  updateLoggedInUser,
  updateLoggedInUserFavorites,
  updateLoggedInUserPhoto,
} = authSlice.actions;
export const selectLoggedInUser = (state) => state.authSlice.loggedInUser;
export const selectLoggedInUserFavorites = (state) =>
  state.authSlice.loggedInUser?.favorites || [];

export default authSlice.reducer;
