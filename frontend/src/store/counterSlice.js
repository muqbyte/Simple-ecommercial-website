import { createSlice } from '@reduxjs/toolkit';

// Create a slice for the counter
export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0,
  },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
});

// Export the action
export const { increment } = counterSlice.actions;

// Export the reducer to be used in the store
export default counterSlice.reducer;
