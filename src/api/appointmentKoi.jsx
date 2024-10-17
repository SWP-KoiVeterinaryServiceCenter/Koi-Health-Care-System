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

export const cancelCurrentUserAppointments = async (id, data) => {
  const response = await api.put(`/api/v1/Appointment/CancelAppointment/${id}`, data);
  return response.data;
};

