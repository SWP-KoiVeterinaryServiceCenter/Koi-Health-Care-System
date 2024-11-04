import { createSlice } from "@reduxjs/toolkit";
import { getAllTransactionThunk } from "../../apiThunk/transactionThunk";

export const alltransactionsSlice = createSlice({
    name: "alltransactions",
    initialState: {
        entities: [],
        draft: [],
        loading: "idle",
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder

            .addCase(getAllTransactionThunk.pending, (state) => {
                state.loading = true;
                state.loading = "loading";
                state.error = null;
            })
            .addCase(getAllTransactionThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.loading = "succeeded";
                state.entities = action.payload;
            })
            .addCase(getAllTransactionThunk.rejected, (state, action) => {
                state.loading = false;
                state.loading = "failed";
                state.error = action.payload;
            });
    },
});

export default alltransactionsSlice.reducer;
