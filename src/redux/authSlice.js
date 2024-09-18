import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "authSlice",
  initialState: {
    loggedInUser: null,
    favorites: [],
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
      const carExists = state.favorites.find(
        (carDocRef) => carDocRef.id === action.payload.id
      );
      if (!carExists) {
        state.favorites.push(action.payload);
      }
    },

    deleteFromLoggedInUserFavorites: (state, action) => {
      state.favorites = state.favorites.filter(
        (carDocRef) => carDocRef.id !== action.payload.id
      );
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
  deleteFromLoggedInUserFavorites,
  updateLoggedInUserPhoto,
} = authSlice.actions;
export const selectLoggedInUser = (state) => state.authSlice.loggedInUser;
export const selectLoggedInUserFavorites = (state) =>
  state.authSlice.favorites || [];

export default authSlice.reducer;
