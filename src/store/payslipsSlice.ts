import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PayslipsState {
  payslips: Payslip[];
}

const initialState: PayslipsState = {
  payslips: [],
};

const payslipsSlice = createSlice({
  name: 'payslips',
  initialState,
  reducers: {
    setPayslips(state, action: PayloadAction<Payslip[]>) {
      state.payslips = action.payload;
    },
  },
});

export const { setPayslips } = payslipsSlice.actions;
export default payslipsSlice.reducer;
