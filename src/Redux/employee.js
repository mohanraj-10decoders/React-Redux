import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  employee: 0,
};

export const employerSlice = createSlice({
  name: 'employer',
  initialState,
  reducers: {
    increment: (state) => {
      state.employee += 1;
    },
    decrement: (state) => {
      state.employee -= 1;
    },
    incrementByAmount: (state, action) => {
      state.employee += action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } =
  employerSlice.actions;

export default employerSlice.reducer;
