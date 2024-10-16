import { createSlice } from "@reduxjs/toolkit";
import { getTotalVetsDetailThunk } from "../../apiThunk/userThunk";

export const totalVetsDetailSlice = createSlice({
    name: "totalVetsDetail",
    initialState: {
        entities: [],
        draft: [],
        loading: "idle",
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder

            .addCase(getTotalVetsDetailThunk.pending, (state) => {
                state.loading = true;
                state.loading = "loading";
                state.error = null;
            })
            .addCase(getTotalVetsDetailThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.loading = "succeeded";
                state.entities = action.payload;
            })
            .addCase(getTotalVetsDetailThunk.rejected, (state, action) => {
                state.loading = false;
                state.loading = "failed";
                state.error = action.payload;
            });
    },
});

export default totalVetsDetailSlice.reducer;
