import api from "./api";

export const getAllWorkingSchedule = async () => {
  const response = await api.get(`/api/v1/WorkingSchedule/GetAll`);
  return response.data;
};


export const createWorkingSchedule = async () => {
  const response = await api.post(`/api/v1/WorkingSchedule/Create`);
  return response.data;
};


export const updateWorkingSchedule = async (id , data ) => {
  const response = await api.patch(`/api/v1/WorkingSchedule/Update/${id}`, data);
  return response.data;
};


export const deleteWorkingSchedule = async (id) => {
  const response = await api.delete(`/api/v1/WorkingSchedule/Delete/${id}`);
  return response.data;
};


export const getWorkingScheduleByVetId = async (accountId) => {
  const response = await api.get(`/api/v1/WorkingSchedule/GetAllByAccountId/${accountId}`);
  return response.data;
};