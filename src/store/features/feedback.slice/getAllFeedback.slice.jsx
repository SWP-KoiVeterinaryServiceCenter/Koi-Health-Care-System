import { createSlice } from "@reduxjs/toolkit";
import { getAllFeedbackThunk } from "../../apiThunk/feedbackThunk"; 

export const getAllFeedbackSlice = createSlice({
    name: "allFeedback",
    initialState: {
        entities: [],
        draft: [],
        loading: "idle",
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder

            .addCase(getAllFeedbackThunk.pending, (state) => {
                state.loading = true;
                state.loading = "loading";
                state.error = null;
            })
            .addCase(getAllFeedbackThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.loading = "succeeded";
                state.entities = action.payload;
            })
            .addCase(getAllFeedbackThunk.rejected, (state, action) => {
                state.loading = false;
                state.loading = "failed";
                state.error = action.payload;
            });
    },
});

export default getAllFeedbackSlice.reducer;
