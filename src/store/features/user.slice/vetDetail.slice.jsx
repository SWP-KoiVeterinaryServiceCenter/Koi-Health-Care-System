import { createSlice } from "@reduxjs/toolkit";
import { getAllVetAccountThunk } from "../../apiThunk/userThunk";

export const vetDetailSlice = createSlice({
    name: "vetDetail",
    initialState: {
        entities: [],
        draft: [],
        loading: "idle",
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
             
            .addCase(getAllVetAccountThunk.pending, (state) => {
                state.loading = true;
                state.loading = "loading";
                state.error = null;
            })
            .addCase(getAllVetAccountThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.loading = "succeeded";
                state.entities = action.payload;
            })
            .addCase(getAllVetAccountThunk.rejected, (state, action) => {
                state.loading = false;
                state.loading = "failed";
                state.error = action.payload;
            });
    },
});

export default vetDetailSlice.reducer;
