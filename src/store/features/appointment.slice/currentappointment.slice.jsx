import { createSlice } from "@reduxjs/toolkit";
import { getCurrentUserAppointmentsThunk } from "../../apiThunk/appointment";

export const currentappointmentSlice = createSlice({
    name: "currentappointment",
    initialState: {
        entities: [],
        draft: [],
        loading: "idle",
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder

            .addCase(getCurrentUserAppointmentsThunk.pending, (state) => {
                state.loading = true;
                state.loading = "loading";
                state.error = null;
            })
            .addCase(getCurrentUserAppointmentsThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.loading = "succeeded";
                state.entities = action.payload;
            })
            .addCase(getCurrentUserAppointmentsThunk.rejected, (state, action) => {
                state.loading = false;
                state.loading = "failed";
                state.error = action.payload;
            });
    },
});

export default currentappointmentSlice.reducer;
