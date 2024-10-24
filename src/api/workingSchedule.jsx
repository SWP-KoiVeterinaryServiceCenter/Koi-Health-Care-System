import api from "./api";

export const getAllWorkingSchedule = async () => {
  const response = await api.get(`/api/v1/AccountSchedule/GetAllAccountSchedules/all`);
  return response.data;
};


export const createWorkingSchedule = async (data) => {
  const response = await api.post(`/api/v1/AccountSchedule/AddAccountToSchedule`, data);
  return response.data; 
};


export const updateWorkingSchedule = async (id , data ) => {
  const response = await api.patch(`/api/v1/AccountSchedule/UpdateAccountSchedule/${id}`, data);
  return response.data;
};


export const deleteWorkingSchedule = async (id) => {
  const response = await api.delete(`/api/v1/WorkingSchedule/Delete/${id}`);
  return response.data;
};


export const getAllWorkingScheduleById = async (id) => {
  const response = await api.get(`/api/v1/AccountSchedule/GetAccountScheduleById/${id}`);
  return response.data;
};



export const getWorkingScheduleByVetId = async (accountId) => {
  const response = await api.get(`/api/v1/WorkingSchedule/GetAllByAccountId/${accountId}`);
  return response.data;
};