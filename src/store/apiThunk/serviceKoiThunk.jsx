import { createAsyncThunk } from "@reduxjs/toolkit";
import {
    // getAllServices,
    getAllServicesType,
    createServicesType
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
  export const createServicesTypeThunk = createAsyncThunk(
    "services/createServicesType",
    async (data, thunkAPI) => {
        try {
            const response = await createServicesType(data);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
            
        }
    }
  );