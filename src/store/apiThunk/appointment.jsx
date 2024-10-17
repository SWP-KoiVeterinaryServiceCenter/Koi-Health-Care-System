import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createAppointmentByAccountId,
  getAllCurrentUserAppointments,
} from "../../api/appointmentKoi";

export const createAppointmentByAccountIdThunk = createAsyncThunk(
  "appointments/createAppointmentByAccountId",
  async (data, thunkAPI) => {
    try {
      const response = await createAppointmentByAccountId(data);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);

export const getAllCurrentUserAppointmentsThunk = createAsyncThunk(
  "appointments/getAllCurrentUserAppointments",
  async (thunkAPI) => {
    try {
      const response = await getAllCurrentUserAppointments();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);
