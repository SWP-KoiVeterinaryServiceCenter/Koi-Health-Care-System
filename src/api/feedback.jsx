import api from "./api";

export const getAllFeedbackByCurrentUserId = async () => {
  const response = await api.get(`/api/v1/Rating/GetAllRatingByCurrentUser`);
  return response.data;
};

export const createFeedback = async (data) => {
  const response = await api.post(`/api/v1/Rating/Create`, data);
  return response.data;
};

export const getAllFeedback = async () => {
  const response = await api.get(`/api/v1/Rating/GetAll`);
  return response.data;
};

// export const deleteFeedback = async (id) => {
//   const response = await api.delete(`/api/v1/Rating/Delete/${id}`);
//   return response.data;
// };

// export const updateFeedback = async (id, data) => {
//   const response = await api.patch(`/api/v1/Rating/Update/${id}`, data );
//   return response.data;
// };

export const getFeedbackById = async (id) => {
  const response = await api.get(`/api/v1/Rating/GetById/${id}`);
  return response.data;
};
