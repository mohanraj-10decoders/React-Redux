import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  employee: [
    {
      id: 1,
      name: 'Test',
      tech: 'Test',
      mobile: 1234,
    },
  ],
};

export const employerSlice = createSlice({
  name: 'employer',
  initialState,
  reducers: {
    ADD: (state, action) => {
      state.employee = [
        ...state.employee,
        {
          id: state.employee.length + 1,
          name: action.payload.name,
          tech: action.payload.tech,
          mobile: action.payload.mobile,
        },
      ];
    },
    // EDIT: (state, action) => {
    //   state.employee = state.employee.map((emp) =>
    //     emp.id == action.payload.id
    //       ? { ...action.payload.data, id: action.payload.id }
    //       : emp
    //   );
    // },
    DELETE: (state, action) => {
      console.log('inside delete', action);
      state.employee = [
        ...state.employee.filter((emp) => emp.id != action.payload.id),
      ];
    },
  },
});

// Action creators are generated for each case reducer function
export const { ADD, DELETE } = employerSlice.actions;

export default employerSlice.reducer;
