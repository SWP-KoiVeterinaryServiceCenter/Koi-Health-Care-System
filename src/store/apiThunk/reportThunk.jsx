import { createAsyncThunk } from "@reduxjs/toolkit";
import {
    getAllReports,
    updateReportStatus,
    getShopReports,
    getReportsUserDetail,
    getAllPostReports,
    getReportsPostDetail
} from "../../api/report";

export const getShopReportsThunk = createAsyncThunk(
    "report/getShopReports",
    async ({ id, pageNumber, pageSize }, thunkAPI) => {
        try {
            const response = await getShopReports(id, pageNumber, pageSize);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const getAllReportsThunk = createAsyncThunk(
    "report/getAllReports",
    async (thunkAPI) => {
        try {
            const response = await getAllReports();
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const getAllPostsReportsThunk = createAsyncThunk(
    "report/getAllPostReports",
    async (thunkAPI) => {
        try {
            const response = await getAllPostReports();
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);


export const getReportsUserDetailThunk = createAsyncThunk(
    "report/getReportsUserDetail",
    async (id,thunkAPI) => {
        try {
            const response = await getReportsUserDetail(id);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);
export const getReportsPostDetailThunk = createAsyncThunk(
    "report/getReportsPostDetail",
    async (id,thunkAPI) => {
        try {
            const response = await getReportsPostDetail(id);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const updateReportStatusThunk = createAsyncThunk(
    "report/updateReportStatus",
    async (data, thunkAPI) => {
        try {
            const response = await updateReportStatus(data);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);
