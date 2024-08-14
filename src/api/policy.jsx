import api from "./api";

export const getCancelledAmount = async () => {
    const response = await api.get(`/api/v1/Policy/GetCancelledAmount`);
    return response.data;
};
export const getPriceAmount = async () => {
    const response = await api.get(`/api/v1/Policy/GetPostPrice`);
    return response.data;
};


export const updateAmount = async (data) => {
    const response = await api.patch(`/api/v1/Policy/UpdateOrderCancelledAmount`, data);
    return response.data;
};

export const updatePrice = async (data) => {
    const response = await api.patch(`/api/v1/Policy/UpdatePostPrice`, data);
    return response.data;
};


export const setStandardPackage = async (susbcriptionId) => {
    const response = await api.patch(`/api/v1/Subcription/UnPrioritySubscription/${susbcriptionId}`);
    return response.data;
};

export const setPriorityPackage = async (susbcriptionId) => {
    const response = await api.patch(`/api/v1/Subcription/PrioritySubscription/${susbcriptionId}`);
    return response.data;
};