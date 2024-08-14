import { createAsyncThunk } from "@reduxjs/toolkit";
import {

    getCancelledAmount,
    updateAmount,



} from "../../api/policy";


//GetAllSubscription
export const getCancelledAmountThunk = createAsyncThunk(
    "policy/getCancelledAmount",
    async (thunkAPI) => {
        try {
            const response = await getCancelledAmount();
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);


//UPDATESubscription
export const updateAmountThunk = createAsyncThunk(
    "policy/updateAmount",
    async (data, thunkAPI) => {
        try {
            const response = await updateAmount(data);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);
