import api from "./api";

// export const login = async (data) => {
//   const response = await api.post(`/api/v1/User/Login`, data); //lay POST login
//   return response.data;
// };

///////////////////////////////////////////////////////////////////LOGIN/////////////////////////////////////////////
export const login = async (data) => {
  const response = await api.post(`/api/v1/Account/Login`, data);
  return response.data;
};

//////////////////////////////////////////////////////////////////CURRENT LOGIN/////////////////////////////////////////////
export const getUserData = async () => {
  const response = await api.get(`/api/v1/Account/GetCurrentLoginUser`);
  return response.data;
};

export const loginGG = async (data) => {
  const response = await api.post(`/api/v1/auths/login/firebase`, data);
  return response.data;
};

export const sendOTP = async () => {
  const response = await api.get(`/api/v1/auths/resend/OTP`);
  return response.data;
};

export const checkEmail = async (email) => {
  const response = await api.get(`/api/v1/Account/SendVerifcationCode/${email}`);
  return response.data;
};
// API call now includes password and confirmPassword in the request body
export const changePasswordForForgotPassword = async ({ code, password, confirmPassword }) => {
  const response = await api.post(`/api/v1/Account/ChangePasswordForForgetPassword/${code}`, {
    password,
    confirmPassword,
  });
  return response.data;
};


export const sendOTPForgotPassword = async (email) => {
  const response = await api.get(
    `/api/v1/auths/forgotpassword/resend/OTP?Email=${email}`
  );
  return response.data;
};

export const newPassword = async (data) => {
  const response = await api.put(`/api/v1/auths/forgotpassword/password`, data);
  return response.data;
};

// export const getUserData = async () => {
//   const response = await api.get(`/api/v1/User/GetCurrentUser`); //La get API CurrentLoginUserInfo
//   return response.data;
// };

export const updateUserData = async (data) => {
  const response = await api.put(`/api/v1/auths`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

// export const approveUser = async (data) => {
//   const response = await api.put(`/api/v1/VerifyUses/ApproveUser/`, data, {//approve the user in verification
//     headers: {
//       "Content-Type": "multipart/form-data",
//     },
//   });
//   return response.data;
// };

export const approveUser = async (id) => {
  const response = await api.put(`/api/v1/VerifyUses/ApproveUser/${id}`); //approve the user in verification
  return response.data;
};
export const unbanUser = async (accountId) => {
  const response = await api.patch(`/api/v1/Account/UnBanAccount/${accountId}`); //unban the user in account
  return response.data;
};
export const banUser = async (accountId) => {
  const response = await api.delete(`/api/v1/Account/BanAccount/${accountId}`); //ban the user in account
  return response.data;
};
export const changeRoleUser = async (userId) => {
  const response = await api.put(`/api/v1/User/CreateModerator/${userId}`); //ban the user in account
  return response.data;
};

export const denyUser = async (id) => {
  const response = await api.put(`/api/v1/VerifyUses/DenyUser/${id}`); //deny the user in verification
  return response.data;
};

export const getUserDetail = async (id) => {
  const response = await api.get(`/api/v1/Account/Accounts/${id}`);
  return response.data;
};

// export const signup = async (data) => {
//   const response = await api.post(`/api/v1/auths/register`, data, {
//     headers: {
//       "Content-Type": "multipart/form-data",
//     },
//   });
//   return response.data;
// };
export const signup = async (data) => {
  const response = await api.post(`/api/v1/Account/Register`, data);
  return response.data;
};

export const verifyUser = async (data) => {
  const response = await api.post(`/api/v1/auths/verify/otp`, data);
  return response.data;
};

export const verifyForgot = async (data) => {
  const response = await api.post(
    `/api/v1/auths/forgotpassword/verify/otp`,
    data
  );
  return response.data;
};

export const updatePassword = async (data) => {
  const response = await api.put(`/api/v1/auths/password`, data);
  return response.data;
};

export const updateStaffPassword = async (data) => {
  const response = await api.put(`/api/v1/auths/staffs/password`, data);
  return response.data;
};

export const getStaffs = async (id, pageNumber, pageSize) => {
  const response = await api.get(
    `/api/v1/auths/pet-coffee-shops/staffs?ShopId=${id}&PageNumber=${pageNumber}&PageSize=${pageSize}`
  );
  return response.data;
};

export const createStaff = async (data) => {
  const response = await api.post(
    `/api/v1/auths/pet-coffee-shops/staffs`,
    data
  );
  return response.data;
};

export const getAllVerifyUsers = async () => {
  const response = await api.get(`/api/v1/VerifyUses/GetAllVerifyUsers`); //La get API All verifyusers
  return response.data;
};

export const getAllUsers = async () => {
  const response = await api.get(`/api/v1/Account/Accounts`); //La get API All users
  return response.data;
};

export const getTotalUsers = async () => {
  const response = await api.get(`/api/v1/Account/CustomerAmount`); //La get API All users
  return response.data;
};
export const getTotalStaffs = async () => {
  const response = await api.get(`/api/v1/Account/StaffAmount`);
  return response.data;
};
export const getTotalVets = async () => {
  const response = await api.get(`/api/v1/Account/VetAmount`);
  return response.data;
};
export const getTotalVetsDetail = async () => {
  const response = await api.get(`/api/v1/Account/Veterinaries`);
  return response.data;
};

export const getAllAccounts = async (role, pageNumber, pageSize) => {
  const response = await api.get(
    `/api/v1/auths/accounts?Roles=${role}&PageNumber=${pageNumber}&PageSize=${pageSize}`
  );
  return response.data;
};

export const updateStatusAccount = async (data) => {
  const response = await api.put(`/api/v1/auths/accounts/status`, data);
  return response.data;
};

export const createStaffAccount = async (data) => {
  const response = await api.post(`/api/v1/Account/CreateStaffAccount`, data);
  return response.data;
};

export const createVetAccount = async (data) => {
  const response = await api.post(`/api/v1/Account/CreateVetAccount`, data);
  return response.data;
};

export const getAllVetAccount = async (data) => {
  const response = await api.get(`/api/v1/Account/Veterinaries`, data);
  return response.data;
};

export const updatetPersonalInformation = async (data) => {
  const response = await api.patch(`/api/v1/Account/UpdateAccount`, data);
  return response.data;
};

// export const uploadProfileImage = async (accountId, data) => {
//   console.log("accountId:", accountId);
//   console.log("data:", data);
//   const response = await api.patch(`/api/v1/Account/UploadProfileImage/${accountId}`,data,
//     {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     }
//   );
//   return response.data;
// };

export const uploadProfileImage = async (data) => {
  // console.log("accountId:", accountId); // Check the value here
  console.log("data:", data); // Check the value here
  const response = await api.patch(`/api/v1/Account/UploadProfileImage`, data, {
      headers: {
          "Content-Type": "multipart/form-data",
      },
  });
  return response.data;
};

export const resetPassword = async (data) => {
  const response = await api.patch(`/api/v1/Account/ResetPassword`, data);
  return response.data;
};

