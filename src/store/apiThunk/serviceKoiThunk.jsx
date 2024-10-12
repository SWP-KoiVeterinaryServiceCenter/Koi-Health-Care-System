import { createAsyncThunk } from "@reduxjs/toolkit";
import {
    getAllServicesType,
    getAllServices
  } from "../../api/serviceKoi";

  export const getAllServicesTypeThunk = createAsyncThunk(
    "services/getAllServicesType",
    async (thunkAPI) => {
      try {
        const response = await getAllServicesType();
        return response;
      } catch (error) {
        return thunkAPI.rejectWithValue(error?.response?.data);
      }
    }
  );

  export const getAllServicesThunk = createAsyncThunk(
    "services/getAllServices",
    async (thunkAPI) => {
      try {
        const response = await getAllServices();
        return response;
      } catch (error) {
        return thunkAPI.rejectWithValue(error?.response?.data);
      }
    }
  );
