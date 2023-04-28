import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  checking: true,
  user: null,
  roles: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    login: (state, action) => {
      state.checking = false;
      state.user = { ...action.payload };
    },
    logout: (state) => {
      state.checking = false;
      state.user = null;
    },
    finishCheking: (state) => {
      state.checking = false;
    },
    loadRoles: (state, action) => {
      state.roles = [...action.payload];
    },
    updateAvatar: (state, action) => {
      state.user = { ...state.user, avatar: action.payload };
    },
  },
});

export const { login, logout, finishCheking, loadRoles, updateAvatar } =
  authSlice.actions;
