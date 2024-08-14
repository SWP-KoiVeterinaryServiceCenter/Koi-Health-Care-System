import { createSlice } from "@reduxjs/toolkit";
import { getCancelledAmountThunk } from "../../apiThunk/policyThunk";

export const cancelSlice = createSlice({
    name: "cancelAmount",
    initialState: {
        entities: [],
        draft: [],
        loading: "idle",
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder

            .addCase(getCancelledAmountThunk.pending, (state) => {
                state.loading = true;
                state.loading = "loading";
                state.error = null;
            })
            .addCase(getCancelledAmountThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.loading = "succeeded";
                state.entities = action.payload;
            })
            .addCase(getCancelledAmountThunk.rejected, (state, action) => {
                state.loading = false;
                state.loading = "failed";
                state.error = action.payload;
            });
    },
});

export default cancelSlice.reducer;
