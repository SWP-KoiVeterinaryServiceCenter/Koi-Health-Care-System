import { createSlice } from "@reduxjs/toolkit";
import { getTotalConfirmAppointmentsThunk } from "../../apiThunk/appointment";

export const totalConfirmAppointmentsSlice = createSlice({
    name: "totalConfirmAppointments",
    initialState: {
        entities: [],
        draft: [],
        loading: "idle",
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder

            .addCase(getTotalConfirmAppointmentsThunk.pending, (state) => {
                state.loading = true;
                state.loading = "loading";
                state.error = null;
            })
            .addCase(getTotalConfirmAppointmentsThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.loading = "succeeded";
                state.entities = action.payload;
            })
            .addCase(getTotalConfirmAppointmentsThunk.rejected, (state, action) => {
                state.loading = false;
                state.loading = "failed";
                state.error = action.payload;
            });
    },
});

export default totalConfirmAppointmentsSlice.reducer;
