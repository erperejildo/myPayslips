import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchedPayslips } from '../mocks/payslips';
import { fetchedPayslip } from '../mocks/payslip';

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

// Here, I'm faking some fetchs with some delay
const mockFetchPayslips = (): Promise<Payslip[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(fetchedPayslips);
    }, 1000);
  });
};

const mockFetchPayslipById = (id: number): Promise<Payslip> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(fetchedPayslip);
    }, 500);
  });
};

export const fetchPayslips = createAsyncThunk('payslips/fetchAll', async () => {
  const response = await mockFetchPayslips();
  return response;
});

export const fetchPayslipById = createAsyncThunk(
  'payslips/fetchById',
  async (id: number) => {
    const response = await mockFetchPayslipById(id);
    return response;
  }
);

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
          // following the example in PayslipsDetails.tsx, this is another approach
          // if we want to get the payslip from the loaded list already
          // state.payslips = state.payslips.map((payslip) =>
          //   payslip.id === action.payload.id ? action.payload : payslip
          // );
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
