import { createSlice } from "@reduxjs/toolkit";
import { getTotalAppointmentThunk } from "../../apiThunk/appointment";

export const totalAppointmentsSlice = createSlice({
    name: "totalAppointments",
    initialState: {
        entities: [],
        draft: [],
        loading: "idle",
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder

            .addCase(getTotalAppointmentThunk.pending, (state) => {
                state.loading = true;
                state.loading = "loading";
                state.error = null;
            })
            .addCase(getTotalAppointmentThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.loading = "succeeded";
                state.entities = action.payload;
            })
            .addCase(getTotalAppointmentThunk.rejected, (state, action) => {
                state.loading = false;
                state.loading = "failed";
                state.error = action.payload;
            });
    },
});

export default totalAppointmentsSlice.reducer;
