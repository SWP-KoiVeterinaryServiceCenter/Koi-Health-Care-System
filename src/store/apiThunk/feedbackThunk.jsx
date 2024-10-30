import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllFeedbackByCurrentUserId,
  createFeedback,
  getAllFeedback,
  deleteFeedback,
  getFeedbackById,
  updateFeedback
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


export const getAllFeedbackThunk = createAsyncThunk(
  "feedback/getAllFeedback",
  async (thunkAPI) => {
    try {
      const response = await getAllFeedback();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);


// export const deleteFeedbackThunk = createAsyncThunk(
//   "feedback/deleteFeedback",
//   async (id ,thunkAPI) => {
//     try {
//       const response = await deleteFeedback(id);
//       return response;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error?.response?.data);
//     }
//   }
// );

// export const updateFeedbackThunk = createAsyncThunk(
//   "feedback/updateFeedback",
//   async ({id ,data},thunkAPI) => {
//     try {
//       const response = await updateFeedback(id, data);
//       return response;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error?.response?.data);
//     }
//   }
// );

export const getFeedbackByIdThunk = createAsyncThunk(
  "feedback/getFeedbackById",
  async (id ,thunkAPI) => {
    try {
      const response = await getFeedbackById(id);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);
