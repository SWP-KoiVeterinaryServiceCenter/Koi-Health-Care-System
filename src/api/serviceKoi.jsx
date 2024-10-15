import api from "./api";

export const getAllServicesType = async (id) => {
  const response = await api.get(`/api/v1/ServiceType/GetAllServiceType`);
  return response.data;
};

export const getAllServices = async () => {
  const response = await api.get(`/api/v1/CenterService/GetAllService`);
  return response.data;
};

export const createAppointmentByAccountId = async (data) => {
  const response = await api.post(`/api/v1/Appointment/CreateAppointment`, data);
  return response.data;
};



