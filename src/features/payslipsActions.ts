import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchedPayslips } from '../mocks/payslips';
import { fetchedPayslip } from '../mocks/payslip';

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
