import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createWorkingSchedule,
  getAllWorkingSchedule,
  updateWorkingSchedule,
  deleteWorkingSchedule,
  getAllWorkingScheduleById
} from "../../api/workingSchedule";

export const getAllWorkingScheduleThunk = createAsyncThunk(
  "schedule/getAllWorkingSchedule",
  async (thunkAPI) => {
    try {
      const response = await getAllWorkingSchedule();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);

export const createWorkingScheduleThunk = createAsyncThunk(
  "schedule/createAllWorkingSchedule",
  async (data, thunkAPI) => {
    try {
      const response = await createWorkingSchedule(data);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);

export const getAllWorkingScheduleByIdThunk = createAsyncThunk(
  "schedule/getAllWorkingScheduleById",
  async (id , thunkAPI) => {
    try {
      const response = await getAllWorkingScheduleById(id);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);

export const updateWorkingScheduleThunk = createAsyncThunk(
  "schedule/updateAllWorkingSchedule",
  async ({ id, data }, thunkAPI) => {
    try {
      const response = await updateWorkingSchedule( id, data );
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);

export const deleteWorkingScheduleThunk = createAsyncThunk(
  "schedule/deleteAllWorkingSchedule",
  async (id, thunkAPI) => {
    try {
      const response = await deleteWorkingSchedule(id);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);
