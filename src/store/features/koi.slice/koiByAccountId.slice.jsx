import { createSlice } from "@reduxjs/toolkit";
import { getKoiByAccountIdThunk } from "../../apiThunk/koiThunk";

export const allKoiByAccountIdSlice = createSlice({
  name: "allKoiByAccountId",
  initialState: {
    entities: [],
    draft: [],
    loading: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(getKoiByAccountIdThunk.pending, (state) => {
        state.loading = true;
        state.loading = "loading";
        state.error = null;
      })
      .addCase(getKoiByAccountIdThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.loading = "succeeded";
        state.entities = action.payload;
      })
      .addCase(getKoiByAccountIdThunk.rejected, (state, action) => {
        state.loading = false;
        state.loading = "failed";
        state.error = action.payload;
      });
  },
});

export default allKoiByAccountIdSlice.reducer;
