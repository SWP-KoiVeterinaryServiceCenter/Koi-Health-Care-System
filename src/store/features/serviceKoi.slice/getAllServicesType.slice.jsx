import { createSlice } from "@reduxjs/toolkit";
import { getAllServicesTypeThunk } from "../../apiThunk/serviceKoiThunk";

export const allServicesTypeSlice = createSlice({
    name: "allServicesType",
    initialState: {
        entities: [],
        draft: [],
        loading: "idle",
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder

            .addCase(getAllServicesTypeThunk.pending, (state) => {
                state.loading = true;
                state.loading = "loading";
                state.error = null;
            })
            .addCase(getAllServicesTypeThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.loading = "succeeded";
                state.entities = action.payload;
            })
            .addCase(getAllServicesTypeThunk.rejected, (state, action) => {
                state.loading = false;
                state.loading = "failed";
                state.error = action.payload;
            });
    },
});

export default allServicesTypeSlice.reducer;
