import { configureStore } from '@reduxjs/toolkit';
import employerReducer from './employee';

export default configureStore({
  reducer: {
    employer: employerReducer,
  },
});
