import api from "./api";

export const getKoiByAccountId = async (accountId) => {
  const response = await api.get(`/api/v1/Koi/GetKoiByAccountId/${accountId}`);
  return response.data;
};

export const getKoiById = async (id) => {
  const response = await api.get(`/api/v1/Koi/GetKoiById/${id}`);
  return response.data;
};

export const addKoiByAccountId = async (data) => {
  const response = await api.post(`/api/v1/Koi/AddKoi`, data , {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const deleteKoiByAccountId = async (id) => {
  const response = await api.delete(`/api/v1/Koi/DeleteKoi/${id}`);
  return response.data;
};

// export const updateKoiByAccountId = async (id , data) => {
//   console.log("id:", id );
//   const response = await api.put(`/api/v1/Koi/UpdateKoi/${id}`, data);
//   return response.data;
// };

export const updateKoiByAccountId = async (id, data) => {
  console.log("id:", id);
  console.log("data:", data);
  const response = await api.put(`/api/v1/Koi/UpdateKoi/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};
