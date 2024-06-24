import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchPayslipById, fetchPayslips } from './payslipsActions';

interface PayslipsState {
  payslips: Payslip[];
  activePayslip: Payslip | null;
  loading: boolean;
  error: string | null;
}

const initialState: PayslipsState = {
  payslips: [],
  activePayslip: null,
  loading: false,
  error: null,
};

const payslipsSlice = createSlice({
  name: 'payslips',
  initialState,
  reducers: {
    setPayslips(state, action: PayloadAction<Payslip[]>) {
      state.payslips = action.payload;
    },
    setActivePayslip(state, action: PayloadAction<Payslip>) {
      state.activePayslip = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPayslipById.pending, (state) => {
        state.error = null;
      })
      .addCase(
        fetchPayslipById.fulfilled,
        (state, action: PayloadAction<Payslip>) => {
          state.activePayslip = action.payload;
        }
      )
      .addCase(fetchPayslipById.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to fetch payslip';
      })
      .addCase(fetchPayslips.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchPayslips.fulfilled,
        (state, action: PayloadAction<Payslip[]>) => {
          state.loading = false;
          state.payslips = action.payload;
        }
      )
      .addCase(fetchPayslips.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch payslips';
      });
  },
});

export const { setPayslips, setActivePayslip } = payslipsSlice.actions;
export default payslipsSlice.reducer;
