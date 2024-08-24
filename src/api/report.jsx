import api from "./api";

export const getAllReports = async () => {
  const response = await api.get(`/api/v1/VerifyReport/GetAllReportsForUsers`);
  return response.data;
};

export const getAllPostReports = async () => {
  const response = await api.get(`/api/v1/VerifyReport/GetAllReportsForPosts`);
  return response.data;
};

export const getReportsUserDetail = async (id) => {
  const response = await api.get(`/api/v1/VerifyReport/GetReportForUserDetail/${id}`);
  return response.data;
};
export const getReportsPostDetail = async (id) => {
  const response = await api.get(`/api/v1/VerifyReport/GetReportForPostDetail/${id}`);
  return response.data;
};

export const getShopReports = async () => {
  const response = await api.get(`/api/v1/VerifyReport/GetAllReports`);
  return response.data;
};

export const updateReportStatus = async (data) => {
  const response = await api.put(`/api/v1/reports/status`, data);
  return response.data;
};
