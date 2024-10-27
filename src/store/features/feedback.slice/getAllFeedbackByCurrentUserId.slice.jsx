import { createSlice } from "@reduxjs/toolkit";
import { getAllFeedbackByCurrentUserIdThunk } from "../../apiThunk/feedbackThunk";

export const getAllFeedbackByCurrentUserIdSlice = createSlice({
    name: "allFeedbackByCurrentUserId",
    initialState: {
        entities: [],
        draft: [],
        loading: "idle",
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder

            .addCase(getAllFeedbackByCurrentUserIdThunk.pending, (state) => {
                state.loading = true;
                state.loading = "loading";
                state.error = null;
            })
            .addCase(getAllFeedbackByCurrentUserIdThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.loading = "succeeded";
                state.entities = action.payload;
            })
            .addCase(getAllFeedbackByCurrentUserIdThunk.rejected, (state, action) => {
                state.loading = false;
                state.loading = "failed";
                state.error = action.payload;
            });
    },
});

export default getAllFeedbackByCurrentUserIdSlice.reducer;
