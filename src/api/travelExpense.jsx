import api from "./api";

export const getAllTravelExpense = async () => {
    const response = await api.get(`/api/v1/TravelExpense/TravelExpenses`);
    return response.data;
  };

export const createTravelExpense = async (data) => {
  const response = await api.post(`/api/v1/TravelExpense/CreateTravelExpense`, data);
  return response.data;
};
  export const deleteTravelExpense= async (id ) => {
    const response = await api.delete(`/api/v1/TravelExpense/DeleteTravelExpense/${id}`); //ban the user in account
    return response.data;
  };
