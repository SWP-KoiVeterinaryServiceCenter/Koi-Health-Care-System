import { createSlice } from "@reduxjs/toolkit";
import { getAllPostsReportsThunk } from "../../apiThunk/reportThunk";

export const allPostReportsSlice = createSlice({
    name: "allPostReports",
    initialState: {
        entities: [],
        draft: [],
        loading: "idle",
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder

            .addCase(getAllPostsReportsThunk.pending, (state) => {
                state.loading = true;
                state.loading = "loading";
                state.error = null;
            })
            .addCase(getAllPostsReportsThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.loading = "succeeded";
                state.entities = action.payload;
            })
            .addCase(getAllPostsReportsThunk.rejected, (state, action) => {
                state.loading = false;
                state.loading = "failed";
                state.error = action.payload;
            });
    },
});

export default allPostReportsSlice.reducer;
