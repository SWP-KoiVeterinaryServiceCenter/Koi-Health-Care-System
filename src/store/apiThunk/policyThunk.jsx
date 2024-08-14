import { createAsyncThunk } from "@reduxjs/toolkit";
import {

    getCancelledAmount,
    updateAmount,
    getPriceAmount,
    updatePrice



} from "../../api/policy";


//GetAllCancelledAmount
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
export const getPriceAmountThunk = createAsyncThunk(
    "policy/getCancelledAmount",
    async (thunkAPI) => {
        try {
            const response = await getPriceAmount();
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);


//UPDATE
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

export const updatePriceThunk = createAsyncThunk(
    "policy/updateAmount",
    async (data, thunkAPI) => {
        try {
            const response = await updatePrice(data);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);
