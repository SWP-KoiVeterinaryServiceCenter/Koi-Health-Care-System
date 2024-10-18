// src/store/apiThunk/paymentThunk.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getPaymentUrl } from '../../api/payment'; // Import API từ paymentApi

export const getPaymentUrlThunk = createAsyncThunk(
  'payment/getPaymentUrl', // Tên của action
  async ({ appointmentId, amount }, thunkAPI) => {
    try {
      const response = await getPaymentUrl({ appointmentId, amount });
      return response; // Trả về dữ liệu nếu API thành công
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data); // Xử lý lỗi
    }
  }
);

// export const getPaymentUrlThunk = createAsyncThunk(
//   'payment/getPaymentUrl',
//   async ({ appointmentId, amount }, thunkAPI) => {
//     try {
//       const response = await getPaymentUrl({ appointmentId, amount });
//       return response.data; // Trả về dữ liệu đường dẫn thanh toán
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error?.response?.data); // Xử lý lỗi
//     }
//   }
// );
