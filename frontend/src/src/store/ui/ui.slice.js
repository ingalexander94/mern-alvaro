import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  darkMode: localStorage.getItem("isDark") === "true",
};

export const uiSlice = createSlice({
  name: "ui",
  initialState: initialState,
  reducers: {
    startLoading: (state) => {
      state.isLoading = true;
    },
    finishLoading: (state) => {
      state.isLoading = false;
    },
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
  },
});

export const { startLoading, finishLoading, toggleDarkMode } = uiSlice.actions;
