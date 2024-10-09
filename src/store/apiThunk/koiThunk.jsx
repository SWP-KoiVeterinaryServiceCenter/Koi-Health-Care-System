import { createAsyncThunk } from "@reduxjs/toolkit";
import { getKoiByAccountId } from "../../api/koi";
import { deleteKoiByAccountId } from "../../api/koi";
import { addKoiByAccountId } from "../../api/koi";
import { updateKoiByAccountId } from "../../api/koi";
import { getKoiById } from "../../api/koi";

export const getKoiByAccountIdThunk = createAsyncThunk(
  "kois/getKoiByAccountIdThunk",
  async (accountId, thunkAPI) => {
    try {
      const response = await getKoiByAccountId(accountId);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);

export const getKoiByIdThunk = createAsyncThunk(
  "kois/getKoiByIdThunk",
  async (id, thunkAPI) => {
    try {
      const response = await getKoiById(id);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);

export const addKoiByAccountIdThunk = createAsyncThunk(
  "kois/addKoiByAccountIdThunk",
  async (data, thunkAPI) => {
    try {
      const response = await addKoiByAccountId(data);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);

export const updateKoiByAccountIdThunk = createAsyncThunk(
  "kois/updateKoiByAccountIdThunk",
  async ({ id, data }, thunkApi) => {
    try {
      const response = await updateKoiByAccountId(id, data);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error?.response?.data);
    }
  }
);

export const deleteKoiByAccountIdThunk = createAsyncThunk(
  "kois/deleteKoiByAccountIdThunk",
  async (id, thunkAPI) => {
    try {
      const response = await deleteKoiByAccountId(id);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);
