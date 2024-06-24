import { configureStore } from '@reduxjs/toolkit';
import payslipsSlice from './features/payslipsSlices';

const store = configureStore({
  reducer: {
    payslipsStore: payslipsSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // just for the purpose of the test
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
