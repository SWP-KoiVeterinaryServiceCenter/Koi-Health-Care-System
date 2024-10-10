import api from "./api";


export const getAllTanks = async () => {
    const response = await api.get(`/api/v1/Tank/GetAllTank`);
    return response.data;
  };

  export const createTanks = async (data) => {
    const response = await api.post(`/api/v1/Tank/CreateTank`, data
      );
    return response.data;
  };