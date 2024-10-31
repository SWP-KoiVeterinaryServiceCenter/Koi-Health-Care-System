import { createSlice } from "@reduxjs/toolkit";
import { getTotalPendingAppointmentsThunk } from "../../apiThunk/appointment";

export const totalPendingAppointmentsSlice = createSlice({
    name: "totalPendingAppointments",
    initialState: {
        entities: [],
        draft: [],
        loading: "idle",
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder

            .addCase(getTotalPendingAppointmentsThunk.pending, (state) => {
                state.loading = true;
                state.loading = "loading";
                state.error = null;
            })
            .addCase(getTotalPendingAppointmentsThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.loading = "succeeded";
                state.entities = action.payload;
            })
            .addCase(getTotalPendingAppointmentsThunk.rejected, (state, action) => {
                state.loading = false;
                state.loading = "failed";
                state.error = action.payload;
            });
    },
});

export default totalPendingAppointmentsSlice.reducer;
