import { createSlice } from "@reduxjs/toolkit";
import { getAllWorkingScheduleThunk } from "../../apiThunk/workingSchedule";

export const allWorkingScheduleSlice = createSlice({
    name: "allWorkingSchedule",
    initialState: {
        entities: [],
        draft: [],
        loading: "idle",
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder

            .addCase(getAllWorkingScheduleThunk.pending, (state) => {
                state.loading = true;
                state.loading = "loading";
                state.error = null;
            })
            .addCase(getAllWorkingScheduleThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.loading = "succeeded";
                state.entities = action.payload;
            })
            .addCase(getAllWorkingScheduleThunk.rejected, (state, action) => {
                state.loading = false;
                state.loading = "failed";
                state.error = action.payload;
            });
    },
});

export default allWorkingScheduleSlice.reducer;
