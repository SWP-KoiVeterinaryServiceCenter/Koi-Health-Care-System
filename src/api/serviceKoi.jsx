import api from "./api";

export const getAllServicesType = async (id) => {
  const response = await api.get(`/api/v1/ServiceType/GetAllServiceType`);
  return response.data;
};

export const createServicesType = async (data) => {
  const response = await api.post(`/api/v1/ServiceType/CreateServiceType`, data);
  return response.data;
};
