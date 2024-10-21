import { createSlice } from "@reduxjs/toolkit";
import { getAllUserAppointmentsThunk } from "../../apiThunk/appointment";

export const allappointmentSlice = createSlice({
    name: "allappointment",
    initialState: {
        entities: [],
        draft: [],
        loading: "idle",
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder

            .addCase(getAllUserAppointmentsThunk.pending, (state) => {
                state.loading = true;
                state.loading = "loading";
                state.error = null;
            })
            .addCase(getAllUserAppointmentsThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.loading = "succeeded";
                state.entities = action.payload;
            })
            .addCase(getAllUserAppointmentsThunk.rejected, (state, action) => {
                state.loading = false;
                state.loading = "failed";
                state.error = action.payload;
            });
    },
});

export default allappointmentSlice.reducer;
