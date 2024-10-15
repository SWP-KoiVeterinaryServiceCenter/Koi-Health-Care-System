import api from "./api";

export const createAppointmentByAccountId = async (data) => {
    const response = await api.post(`/api/v1/Appointment/CreateAppointment`, data);
    return response.data;
  };
  