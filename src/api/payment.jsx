// src/api/paymentApi.js
import api from './api'; // Giả định rằng bạn đã có file api để xử lý base URL và cấu hình axios

export const getPaymentUrl = async ({ appointmentId, amount }) => {
  const response = await api.get(`/api/v1/Payment/GetPaymentUrl`, {
    params: {
      appointmentId,
      amount,
    },
  });
  return response.data; // Trả về dữ liệu từ API
};
