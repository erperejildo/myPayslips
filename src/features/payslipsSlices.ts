import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchPayslipById, fetchPayslips } from './payslipsActions';

interface PayslipsState {
  payslips: { list: Payslip[]; loading: boolean; error: string | null };
  activePayslip: {
    payslip: Payslip | null;
    loading: boolean;
    error: string | null;
  };
}

const initialState: PayslipsState = {
  payslips: { list: [], loading: false, error: null },
  activePayslip: { payslip: null, loading: false, error: null },
};

export const payslipsSlice = createSlice({
  name: 'payslips',
  initialState,
  reducers: {
    setPayslips(state, action: PayloadAction<Payslip[]>) {
      state.payslips.list = action.payload;
    },
    setActivePayslip(state, action: PayloadAction<Payslip>) {
      state.activePayslip.payslip = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPayslipById.pending, (state) => {
        state.activePayslip.loading = true;
        state.activePayslip.error = null;
      })
      .addCase(
        fetchPayslipById.fulfilled,
        (state, action: PayloadAction<Payslip>) => {
          state.activePayslip.loading = false;
          state.activePayslip.payslip = action.payload;
        }
      )
      .addCase(fetchPayslipById.rejected, (state, action) => {
        state.activePayslip.loading = false;
        state.activePayslip.error = action.error.message!;
      })
      .addCase(fetchPayslips.pending, (state) => {
        state.payslips.loading = true;
        state.payslips.error = null;
      })
      .addCase(
        fetchPayslips.fulfilled,
        (state, action: PayloadAction<Payslip[]>) => {
          state.payslips.loading = false;
          state.payslips.list = action.payload;
        }
      )
      .addCase(fetchPayslips.rejected, (state, action) => {
        state.payslips.loading = false;
        state.payslips.error = action.error.message!;
      });
  },
});

export const { setPayslips, setActivePayslip } = payslipsSlice.actions;
export default payslipsSlice.reducer;
