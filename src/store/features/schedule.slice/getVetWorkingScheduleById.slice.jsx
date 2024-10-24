import { createSlice } from "@reduxjs/toolkit";
import { getVetWorkingScheduleByIdThunk } from "../../apiThunk/workingSchedule";

export const getVetWorkingScheduleByIdSlice = createSlice({
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

            .addCase(getVetWorkingScheduleByIdThunk.pending, (state) => {
                state.loading = true;
                state.loading = "loading";
                state.error = null;
            })
            .addCase(getVetWorkingScheduleByIdThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.loading = "succeeded";
                state.entities = action.payload;
            })
            .addCase(getVetWorkingScheduleByIdThunk.rejected, (state, action) => {
                state.loading = false;
                state.loading = "failed";
                state.error = action.payload;
            });
    },
});

export default getVetWorkingScheduleByIdSlice.reducer;
