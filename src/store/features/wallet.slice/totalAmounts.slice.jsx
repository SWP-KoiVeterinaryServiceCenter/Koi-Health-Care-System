import {createSlice} from '@reduxjs/toolkit';
import {getTotalTransactionAmountsThunk} from '../../apiThunk/walletThunk';

export const totalAmountsSlice = createSlice({
  name: 'totalAmounts',
  initialState: {
    entities: [],
    draft: [],
    loading: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder

      .addCase(getTotalTransactionAmountsThunk.pending, state => {
        state.loading = true;
        state.loading = 'loading';
        state.error = null;
      })
      .addCase(getTotalTransactionAmountsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.loading = 'succeeded';
        state.entities = action.payload;
      })
      .addCase(getTotalTransactionAmountsThunk.rejected, (state, action) => {
        state.loading = false;
        state.loading = 'failed';
        state.error = action.payload;
      });
  },
});

export default totalAmountsSlice.reducer;
