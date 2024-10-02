import { createSlice } from "@reduxjs/toolkit";
import { getReportsUserDetailThunk } from "../../apiThunk/reportThunk";

export const userReportsSlice = createSlice({
    name: "userReports",
    initialState: {
        entities: [],
        draft: [],
        loading: "idle",
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder

            .addCase(getReportsUserDetailThunk.pending, (state) => {
                state.loading = true;
                state.loading = "loading";
                state.error = null;
            })
            .addCase(getReportsUserDetailThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.loading = "succeeded";
                state.entities = action.payload;
            })
            .addCase(getReportsUserDetailThunk.rejected, (state, action) => {
                state.loading = false;
                state.loading = "failed";
                state.error = action.payload;
            });
    },
});

export default userReportsSlice.reducer;
