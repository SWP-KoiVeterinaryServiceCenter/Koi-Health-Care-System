import { createSlice } from "@reduxjs/toolkit";
import { getAppointmentByCurrentVetThunk } from "../../apiThunk/appointment";

export const appointmentByCurrentVetSlice = createSlice({
    name: "appointmentByCurrentVet",
    initialState: {
        entities: [],
        draft: [],
        loading: "idle",
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder

            .addCase(getAppointmentByCurrentVetThunk.pending, (state) => {
                state.loading = true;
                state.loading = "loading";
                state.error = null;
            })
            .addCase(getAppointmentByCurrentVetThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.loading = "succeeded";
                state.entities = action.payload;
            })
            .addCase(getAppointmentByCurrentVetThunk.rejected, (state, action) => {
                state.loading = false;
                state.loading = "failed";
                state.error = action.payload;
            });
    },
});

export default appointmentByCurrentVetSlice.reducer;
