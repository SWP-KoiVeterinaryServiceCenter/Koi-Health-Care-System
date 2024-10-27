import { createSlice } from "@reduxjs/toolkit";
import { getFeedbackByIdThunk } from "../../apiThunk/feedbackThunk"; 

export const getFeedbackByIdSlice = createSlice({
    name: "getFeedbackById",
    initialState: {
        entities: [],
        draft: [],
        loading: "idle",
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder

            .addCase(getFeedbackByIdThunk.pending, (state) => {
                state.loading = true;
                state.loading = "loading";
                state.error = null;
            })
            .addCase(getFeedbackByIdThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.loading = "succeeded";
                state.entities = action.payload;
            })
            .addCase(getFeedbackByIdThunk.rejected, (state, action) => {
                state.loading = false;
                state.loading = "failed";
                state.error = action.payload;
            });
    },
});

export default getFeedbackByIdSlice.reducer;
