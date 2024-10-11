import { createSlice } from "@reduxjs/toolkit";
import { getTotalVetsThunk } from "../../apiThunk/userThunk";

export const totalVetsSlice = createSlice({
    name: "totalVets",
    initialState: {
        entities: [],
        draft: [],
        loading: "idle",
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder

            .addCase(getTotalVetsThunk.pending, (state) => {
                state.loading = true;
                state.loading = "loading";
                state.error = null;
            })
            .addCase(getTotalVetsThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.loading = "succeeded";
                state.entities = action.payload;
            })
            .addCase(getTotalVetsThunk.rejected, (state, action) => {
                state.loading = false;
                state.loading = "failed";
                state.error = action.payload;
            });
    },
});

export default totalVetsSlice.reducer;
