// redux/features/authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the initial state
const initialState = {
  user: null, // Initially, no user is logged in// Store JWT token
};

// Create the slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setUser: (state, action: PayloadAction<any>) => {
      state.user = action.payload.user;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

// Export actions and reducer
export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
