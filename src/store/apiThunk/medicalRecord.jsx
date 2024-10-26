import { createAsyncThunk } from "@reduxjs/toolkit";
import {
    getAllmedicalRecords,
    createmedicalRecords,
    // deletemedicalRecord
  } from "../../api/medicalRecord";

  export const getAllmedicalRecordsThunk = createAsyncThunk(
    "medicalRecords/getAllmedicalRecords",
    async (appointmentId, thunkAPI) => {
      try {
        const response = await getAllmedicalRecords(appointmentId);
        return response;
      } catch (error) {
        return thunkAPI.rejectWithValue(error?.response?.data);
      }
    }
  );
//   export const createmedicalRecordsThunk = createAsyncThunk(
//     "medicalRecords/createmedicalRecords",
//     async (data, thunkAPI) => {
//         try {
//             const response = await createmedicalRecords(data);
//             return response;
//         } catch (error) {
//             return thunkAPI.rejectWithValue(error.response.data);
            
//         }
//     }
//   );
export const createmedicalRecordsThunk = createAsyncThunk(
    "medicalRecords/createmedicalRecords",
    async ({ appointmentId, data }, thunkAPI) => {
      try {
        const response = await createmedicalRecords(appointmentId, data);
        return response;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data || 'Error');
      }
    }
  );


//   export const deletemedicalRecordThunk = createAsyncThunk(
//     "medicalRecords/deletemedicalRecord",
//     async (id, thunkAPI) => {
//       try {
//         const response = await deletemedicalRecord(id);
//         return response;
//       } catch (error) {
//         return thunkAPI.rejectWithValue(error?.response?.data);
//       }
//     }
//   );
  