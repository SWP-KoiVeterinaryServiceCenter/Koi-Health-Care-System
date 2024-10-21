import { createSlice } from "@reduxjs/toolkit";
import { getAllCurrentUserAppointmentsThunk } from "../../apiThunk/appointment";

export const currentUserAppointmentsSlice = createSlice({
    name: "allServices",
    initialState: {
        entities: [],
        draft: [],
        loading: "idle",
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder

            .addCase(getAllCurrentUserAppointmentsThunk.pending, (state) => {
                state.loading = true;
                state.loading = "loading";
                state.error = null;
            })
            .addCase(getAllCurrentUserAppointmentsThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.loading = "succeeded";
                state.entities = action.payload;
            })
            .addCase(getAllCurrentUserAppointmentsThunk.rejected, (state, action) => {
                state.loading = false;
                state.loading = "failed";
                state.error = action.payload;
            });
    },
});

export default currentUserAppointmentsSlice.reducer;
