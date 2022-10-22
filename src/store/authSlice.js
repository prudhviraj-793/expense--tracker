import { createSlice } from "@reduxjs/toolkit";

let userId = localStorage.key(0);
if (!userId) {
    userId = ''
}
const token = localStorage.getItem(userId);
const initialAuthState = {
  isAuthenticated: userId.trim().length !== 0,
  token,
  userId,
};

const authSlice = createSlice({
  name: "authentication",
  initialState: initialAuthState,
  reducers: {
    login(state) {
      state.isAuthenticated = true;
    },
    logout(state) {
      state.isAuthenticated = false;
    },
    token(state, action) {
      state.token = action.payload;
    },
    userId(state, action) {
      state.userId = action.payload;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
