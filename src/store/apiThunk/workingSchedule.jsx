import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createWorkingSchedule,
  getAllWorkingSchedule,
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
  async (data , thunkAPI) => {
    try {
      const response = await createWorkingSchedule(data);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);
