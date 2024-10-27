import api from "./api";

export const getAllmedicalRecords = async (appointmentId) => {
  const response = await api.get(`/api/v1/MedicalRecord/MedicalRecords/${appointmentId}`);
  return response.data;
};
export const createmedicalRecords = async (appointmentId, data) => {
  const response = await api.post(
    `/api/v1/MedicalRecord/CreateMedicalRecord/${appointmentId}`,
    data
  );
  return response.data;
};
//   export const deleteTank= async (id ) => {
//     const response = await api.delete(`/api/v1/Tank/RemoveTank/${id}`); //ban the user in account
//     return response.data;
//   };
