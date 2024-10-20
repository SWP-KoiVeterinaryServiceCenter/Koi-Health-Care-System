import api from "./api";

export const createAppointmentByAccountId = async (data) => {
  const response = await api.post(
    `/api/v1/Appointment/CreateAppointment`,
    data
  );
  return response.data;
};

export const getAllCurrentUserAppointments = async () => {
  const response = await api.get(`/api/v1/Appointment/CurrentUserAppointments`);
  return response.data;
};
export const getAllUserAppointments = async () => {
  const response = await api.get(`/api/v1/Appointment/Appointments`);
  return response.data;
};

export const cancelCurrentUserAppointments = async (id, data) => {
  const response = await api.put(`/api/v1/Appointment/CancelAppointment/${id}`, data);
  return response.data;
};

export const getCurrentUserAppointments = async () => {
  const response = await api.get(`/api/v1/Appointment/CurrentUserAppointments`);
  return response.data;
};

export const deleteAppointments= async (id ) => {
  const response = await api.delete(`/api/v1/Appointment/DeleteAppointment/${id}`); //ban the user in account
  return response.data;
};
export const cancelAppointments= async (id ) => {
  const response = await api.put(`/api/v1/Appointment/CancelAppointment/${id}`); //ban the user in account
  return response.data;
};
export const confirmAppointments= async (id ) => {
  const response = await api.put(`/api/v1/Appointment/FinishAppointment/${id}`); //ban the user in account
  return response.data;
};
export const missAppointments= async (id ) => {
  const response = await api.put(`/api/v1/Appointment/MissAppointment/${id}`); //ban the user in account
  return response.data;
};