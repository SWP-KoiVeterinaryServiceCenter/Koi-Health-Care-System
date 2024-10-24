import { createSlice } from "@reduxjs/toolkit";
import { getAllTravelExpenseThunk } from "../../apiThunk/travelExpense";

export const getAllTravelExpenseSlice = createSlice({
    name: "getAllTravelExpense",
    initialState: {
        entities: [],
        draft: [],
        loading: "idle",
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder

            .addCase(getAllTravelExpenseThunk.pending, (state) => {
                state.loading = true;
                state.loading = "loading";
                state.error = null;
            })
            .addCase(getAllTravelExpenseThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.loading = "succeeded";
                state.entities = action.payload;
            })
            .addCase(getAllTravelExpenseThunk.rejected, (state, action) => {
                state.loading = false;
                state.loading = "failed";
                state.error = action.payload;
            });
    },
});

export default getAllTravelExpenseSlice.reducer;
