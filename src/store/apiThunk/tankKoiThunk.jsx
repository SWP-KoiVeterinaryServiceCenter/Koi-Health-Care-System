import { createAsyncThunk } from "@reduxjs/toolkit";
import {
    getAllTanks,
    createTanks,
    deleteTank
  } from "../../api/tankKoi";

  export const getAllTanksThunk = createAsyncThunk(
    "tanks/getAllTanks",
    async (thunkAPI) => {
      try {
        const response = await getAllTanks();
        return response;
      } catch (error) {
        return thunkAPI.rejectWithValue(error?.response?.data);
      }
    }
  );

  export const createTanksThunk = createAsyncThunk(
    "tanks/createTanks",
    async (data, thunkAPI) => {
        try {
            const response = await createTanks(data);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
            
        }
    }
  );
  export const deleteTankThunk = createAsyncThunk(
    "tanks/deleteTank",
    async (id, thunkAPI) => {
      try {
        const response = await deleteTank(id);
        return response;
      } catch (error) {
        return thunkAPI.rejectWithValue(error?.response?.data);
      }
    }
  );
  