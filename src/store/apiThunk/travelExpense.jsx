import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllTravelExpense,
    createTravelExpense,
    deleteTravelExpense
  } from "../../api/travelExpense";

  export const getAllTravelExpenseThunk = createAsyncThunk(
    "travelExpense/getAllTravelExpense",
    async (thunkAPI) => {
      try {
        const response = await getAllTravelExpense();
        return response;
      } catch (error) {
        return thunkAPI.rejectWithValue(error?.response?.data);
      }
    }
  );

  export const createTravelExpenseThunk = createAsyncThunk(
    "travelExpense/createTravelExpense",
    async (data, thunkAPI) => {
        try {
            const response = await createTravelExpense(data);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
            
        }
    }
  );
  export const deleteTravelExpenseThunk = createAsyncThunk(
    "travelExpense/deleteTravelExpense",
    async (id, thunkAPI) => {
      try {
        const response = await deleteTravelExpense(id);
        return response;
      } catch (error) {
        return thunkAPI.rejectWithValue(error?.response?.data);
      }
    }
  );
  