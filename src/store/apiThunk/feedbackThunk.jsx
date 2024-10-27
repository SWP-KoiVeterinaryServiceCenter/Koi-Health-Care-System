import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllFeedbackByCurrentUserId,
  createFeedback,
} from "../../api/feedback";



export const getAllFeedbackByCurrentUserIdThunk = createAsyncThunk(
  "feedback/getAllFeedbackByCurrentUserId",
  async (thunkAPI) => {
    try {
      const response = await getAllFeedbackByCurrentUserId();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);


export const createFeedbackThunk = createAsyncThunk(
  "feedback/createFeedback",
  async (data, thunkAPI) => {
    try {
      const response = await createFeedback(data);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
