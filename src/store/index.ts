import { configureStore } from '@reduxjs/toolkit';
import payslipsReducer from './payslipsSlice';

const store = configureStore({
  reducer: {
    payslips: payslipsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
