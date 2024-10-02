import { createSlice } from "@reduxjs/toolkit";
import { getReportsPostDetailThunk } from "../../apiThunk/reportThunk";

export const postReportsSlice = createSlice({
    name: "postReports",
    initialState: {
        entities: [],
        draft: [],
        loading: "idle",
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder

            .addCase(getReportsPostDetailThunk.pending, (state) => {
                state.loading = true;
                state.loading = "loading";
                state.error = null;
            })
            .addCase(getReportsPostDetailThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.loading = "succeeded";
                state.entities = action.payload;
            })
            .addCase(getReportsPostDetailThunk.rejected, (state, action) => {
                state.loading = false;
                state.loading = "failed";
                state.error = action.payload;
            });
    },
});

export default postReportsSlice.reducer;
