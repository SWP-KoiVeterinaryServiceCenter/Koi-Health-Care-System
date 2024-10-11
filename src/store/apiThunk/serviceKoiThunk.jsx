import { createAsyncThunk } from "@reduxjs/toolkit";
import {
    // getAllServices,
    getAllServicesType
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