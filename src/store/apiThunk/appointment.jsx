import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createAppointmentByAccountId,
  getCurrentUserAppointments,
  deleteAppointments,
  cancelAppointments,
  getAllCurrentUserAppointments,
  cancelCurrentUserAppointments,
  getAllUserAppointments,
  confirmAppointments,
  missAppointments,
  getAppointmentByCurrentVet,
  getTotalConfirmAppointments,
  getTotalAppointment,
  getTotalPendingAppointments
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
export const missAppointmentsThunk = createAsyncThunk(
  "appointments/missAppointments",
  async (id, thunkAPI) => {
    try {
      const response = await missAppointments(id);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);
export const confirmAppointmentsThunk = createAsyncThunk(
  "appointments/confirmAppointments",
  async (id, thunkAPI) => {
    try {
      const response = await confirmAppointments(id);
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
export const getAllUserAppointmentsThunk = createAsyncThunk(
  "appointments/getAllUserAppointments",
  async (thunkAPI) => {
    try {
      const response = await getAllUserAppointments();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);
export const getAppointmentByCurrentVetThunk = createAsyncThunk(
  "appointments/getAppointmentByCurrentVet",
  async (thunkAPI) => {
    try {
      const response = await getAppointmentByCurrentVet();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);

export const cancelCurrentUserAppointmentsThunk = createAsyncThunk(
  "appointments/cancelCurrentUserAppointments",
  async (data, thunkAPI) => {
    try {
      const response = await cancelCurrentUserAppointments(data);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);

export const getTotalConfirmAppointmentsThunk = createAsyncThunk(
  "appointments/getTotalConfirmAppointments",
  async (thunkAPI) => {
    try {
      const response = await getTotalConfirmAppointments();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);

export const getTotalAppointmentThunk = createAsyncThunk(
  "appointments/getTotalAppointment",
  async (thunkAPI) => {
    try {
      const response = await getTotalAppointment();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);

export const getTotalPendingAppointmentsThunk = createAsyncThunk(
  "appointments/getTotalPendingAppointments",
  async (thunkAPI) => {
    try {
      const response = await getTotalPendingAppointments();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);
