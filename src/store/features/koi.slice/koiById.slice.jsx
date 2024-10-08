import { createSlice } from "@reduxjs/toolkit";
import { getKoiByIdThunk } from "../../apiThunk/koiThunk";

export const allKoiByIdSlice = createSlice({
  name: "allKoiById",
  initialState: {
    entities: [],
    draft: [],
    loading: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(getKoiByIdThunk.pending, (state) => {
        state.loading = true;
        state.loading = "loading";
        state.error = null;
      })
      .addCase(getKoiByIdThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.loading = "succeeded";
        state.entities = action.payload;
      })
      .addCase(getKoiByIdThunk.rejected, (state, action) => {
        state.loading = false;
        state.loading = "failed";
        state.error = action.payload;
      });
  },
});

export default allKoiByIdSlice.reducer;
