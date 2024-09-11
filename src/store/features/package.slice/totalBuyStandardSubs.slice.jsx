import { createSlice } from "@reduxjs/toolkit";
import { getTotalBuyStandardSubsThunk } from "../../apiThunk/packageThunk";

export const totalBuyStandardSubsSlice = createSlice({
    name: "totalBuyStandardSubs",
    initialState: {
        entities: [],
        draft: [],
        loading: "idle",
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder

            .addCase(getTotalBuyStandardSubsThunk.pending, (state) => {
                state.loading = true;
                state.loading = "loading";
                state.error = null;
            })
            .addCase(getTotalBuyStandardSubsThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.loading = "succeeded";
                state.entities = action.payload;
            })
            .addCase(getTotalBuyStandardSubsThunk.rejected, (state, action) => {
                state.loading = false;
                state.loading = "failed";
                state.error = action.payload;
            });
    },
});

export default totalBuyStandardSubsSlice.reducer;
