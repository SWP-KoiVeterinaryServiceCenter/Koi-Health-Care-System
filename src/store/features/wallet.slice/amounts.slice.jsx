import {createSlice} from '@reduxjs/toolkit';
import {getTransactionAmountsThunk} from '../../apiThunk/walletThunk';

export const AmountsSlice = createSlice({
  name: 'Amounts',
  initialState: {
    entities: [],
    draft: [],
    loading: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder

      .addCase(getTransactionAmountsThunk.pending, state => {
        state.loading = true;
        state.loading = 'loading';
        state.error = null;
      })
      .addCase(getTransactionAmountsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.loading = 'succeeded';
        state.entities = action.payload;
      })
      .addCase(getTransactionAmountsThunk.rejected, (state, action) => {
        state.loading = false;
        state.loading = 'failed';
        state.error = action.payload;
      });
  },
});

export default AmountsSlice.reducer;
