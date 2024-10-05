import api from "./api";

export const getKoiByAccountId = async (accountId) => {
  const response = await api.get(`/api/v1/Koi/GetKoiByAccountId/${accountId}`);
  return response.data;
};

export const addKoiByAccountId = async (data) => {
    const response = await api.post(`/api/v1/Koi/AddKoi`, data);
    return response.data;
  };

export const deleteKoiByAccountId = async (id) => {
  const response = await api.delete(`/api/v1/Koi/DeleteKoi/${id}`);
  return response.data;
};

