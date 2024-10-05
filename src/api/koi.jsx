import api from "./api";

export const getKoiByAccountId = async (id) => {
  const response = await api.get(`/api/v1/Koi/GetKoiByAccountId/${id}`);
  return response.data;
};
