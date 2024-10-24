import { createSlice } from "@reduxjs/toolkit";
import { getAllWorkingScheduleByIdThunk } from "../../apiThunk/workingSchedule";

export const allWorkingScheduleByIdSlice = createSlice({
    name: "allWorkingScheduleById",
    initialState: {
        entities: [],
        draft: [],
        loading: "idle",
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder

            .addCase(getAllWorkingScheduleByIdThunk.pending, (state) => {
                state.loading = true;
                state.loading = "loading";
                state.error = null;
            })
            .addCase(getAllWorkingScheduleByIdThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.loading = "succeeded";
                state.entities = action.payload;
            })
            .addCase(getAllWorkingScheduleByIdThunk.rejected, (state, action) => {
                state.loading = false;
                state.loading = "failed";
                state.error = action.payload;
            });
    },
});

export default allWorkingScheduleByIdSlice.reducer;
