import { createAsyncThunk } from "@reduxjs/toolkit";
import { createAppointmentByAccountId, getCurrentUserAppointments } from "../../api/appointmentKoi";

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

export const getCurrentUserAppointmentsThunk = createAsyncThunk(
  "appointments/getCurrentUserAppointments",
  async (thunkAPI) => {
    try {
      const response = await getCurrentUserAppointments();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);
