import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createAppointmentByAccountId,
  getCurrentUserAppointments,
  deleteAppointments,
  cancelAppointments,
  getAllCurrentUserAppointments,
  cancelCurrentUserAppointments
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

export const deleteAppointmentsThunk = createAsyncThunk(
  "appointments/deleteAppointments",
  async (id, thunkAPI) => {
    try {
      const response = await deleteAppointments(id);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);


export const cancelAppointmentsThunk = createAsyncThunk(
  "appointments/cancelAppointments",
  async (id, thunkAPI) => {
    try {
      const response = await cancelAppointments(id);
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

export const cancelCurrentUserAppointmentsThunk = createAsyncThunk(
  "appointments/cancelCurrentUserAppointments",
  async (data , thunkAPI) => {
    try {
      const response = await cancelCurrentUserAppointments(data);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);
