import { createSlice } from "@reduxjs/toolkit";
import { getTotalBuyPrioritySubsThunk } from "../../apiThunk/packageThunk";

export const totalBuyPrioritySubsSlice = createSlice({
    name: "totalBuyPrioritySubs",
    initialState: {
        entities: [],
        draft: [],
        loading: "idle",
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder

            .addCase(getTotalBuyPrioritySubsThunk.pending, (state) => {
                state.loading = true;
                state.loading = "loading";
                state.error = null;
            })
            .addCase(getTotalBuyPrioritySubsThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.loading = "succeeded";
                state.entities = action.payload;
            })
            .addCase(getTotalBuyPrioritySubsThunk.rejected, (state, action) => {
                state.loading = false;
                state.loading = "failed";
                state.error = action.payload;
            });
    },
});

export default totalBuyPrioritySubsSlice.reducer;
