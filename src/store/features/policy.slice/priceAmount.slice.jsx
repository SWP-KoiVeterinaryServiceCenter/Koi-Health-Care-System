import { createSlice } from "@reduxjs/toolkit";
import { getPriceAmountThunk } from "../../apiThunk/policyThunk";

export const priceSlice = createSlice({
    name: "priceAmount",
    initialState: {
        entities: [],
        draft: [],
        loading: "idle",
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder

            .addCase(getPriceAmountThunk.pending, (state) => {
                state.loading = true;
                state.loading = "loading";
                state.error = null;
            })
            .addCase(getPriceAmountThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.loading = "succeeded";
                state.entities = action.payload;
            })
            .addCase(getPriceAmountThunk.rejected, (state, action) => {
                state.loading = false;
                state.loading = "failed";
                state.error = action.payload;
            });
    },
});

export default priceSlice.reducer;
