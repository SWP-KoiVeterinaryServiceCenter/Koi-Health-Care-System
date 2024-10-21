import { createSlice } from "@reduxjs/toolkit";
import { getPaymentUrlThunk  } from "../../apiThunk/paymentThunk";

export const paymentSlice  = createSlice({
    name: "payment",
    initialState: {
        entities: [],
        draft: [],
        loading: "idle",
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder

            .addCase(getPaymentUrlThunk .pending, (state) => {
                state.loading = true;
                state.loading = "loading";
                state.error = null;
            })
            .addCase(getPaymentUrlThunk .fulfilled, (state, action) => {
                state.loading = false;
                state.loading = "succeeded";
                state.entities = action.payload;
            })
            .addCase(getPaymentUrlThunk .rejected, (state, action) => {
                state.loading = false;
                state.loading = "failed";
                state.error = action.payload;
            });
    },
});

export default paymentSlice .reducer;
