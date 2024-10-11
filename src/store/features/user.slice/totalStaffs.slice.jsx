import { createSlice } from "@reduxjs/toolkit";
import { getTotalStaffsThunk } from "../../apiThunk/userThunk";

export const totalStaffsSlice = createSlice({
    name: "totalStaffs",
    initialState: {
        entities: [],
        draft: [],
        loading: "idle",
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder

            .addCase(getTotalStaffsThunk.pending, (state) => {
                state.loading = true;
                state.loading = "loading";
                state.error = null;
            })
            .addCase(getTotalStaffsThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.loading = "succeeded";
                state.entities = action.payload;
            })
            .addCase(getTotalStaffsThunk.rejected, (state, action) => {
                state.loading = false;
                state.loading = "failed";
                state.error = action.payload;
            });
    },
});

export default totalStaffsSlice.reducer;
