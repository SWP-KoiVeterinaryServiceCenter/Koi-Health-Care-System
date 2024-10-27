import api from "./api";

export const getAllFeedbackByCurrentUserId = async () => {
  const response = await api.get(`/api/v1/Rating/GetAllRatingByCurrentUser`);
  return response.data;
};

export const createFeedback = async (data) => {
  const response = await api.post(`/api/v1/Rating/Create`,data);
  return response.data;
};



