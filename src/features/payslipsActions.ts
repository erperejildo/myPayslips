import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchedPayslips } from '../mocks/payslips';
import { fetchedPayslip } from '../mocks/payslip';

const mockFetchPayslips = (): Promise<Payslip[]> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        // uncomment next line to force an error
        // throw new Error('Failed to fetch payslips');
        resolve(fetchedPayslips);
      } catch (error) {
        reject(error);
      }
    }, 1000);
  });
};

const mockFetchPayslipById = (id: number): Promise<Payslip> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        // uncomment next line to force an error
        // throw new Error('Failed to fetch payslip');
        resolve(fetchedPayslip);
      } catch (error) {
        reject(error);
      }
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
