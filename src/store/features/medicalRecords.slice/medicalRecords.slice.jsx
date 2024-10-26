import { createSlice } from "@reduxjs/toolkit";

import { getAllmedicalRecordsThunk } from "../../apiThunk/medicalRecord";



export const medicalRecordsSlice = createSlice({
  name: "medicalRecords",
  initialState: {
    entities: [],
    draft: [],
    loading: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(getAllmedicalRecordsThunk.pending, (state) => {
        state.loading = true;
        state.loading = "loading";
        state.error = null;
      })
      .addCase(getAllmedicalRecordsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.loading = "succeeded";
        state.entities = action.payload;
      })
      .addCase(getAllmedicalRecordsThunk.rejected, (state, action) => {
        state.loading = false;
        state.loading = "failed";
        state.error = action.payload;
      });
  },
});

export default medicalRecordsSlice.reducer;
