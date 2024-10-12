import api from "./api";

export const getAllServicesType = async (id) => {
  const response = await api.get(`/api/v1/ServiceType/GetAllServiceType`);
  return response.data;
};

export const getAllServices = async () => {
  const response = await api.get(`/api/v1/CenterService/GetAllService`);
  return response.data;
};


