import api from "./api";

export const getAllServicesType = async (id) => {
  const response = await api.get(`/api/v1/ServiceType/GetAllServiceType`);
  return response.data;
};


export const createServicesType = async (data) => {
  const response = await api.post(`/api/v1/ServiceType/CreateServiceType`, data);
  return response.data;
};

export const deleteServicesType = async (typeId ) => {
  const response = await api.delete(`/api/v1/ServiceType/DeleteServiceType/${typeId}`); //ban the user in account
  return response.data;
};

export const createServiceCenter = async (data) => {
  const response = await api.post(`/api/v1/CenterService/CreateCenterService`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const createAppointmentByAccountId = async (data) => {
  const response = await api.post(`/api/v1/Appointment/CreateAppointment`, data);
  return response.data;
};



export const getAllServices = async () => {
  const response = await api.get(`/api/v1/CenterService/GetAllService`);
  return response.data;
};
