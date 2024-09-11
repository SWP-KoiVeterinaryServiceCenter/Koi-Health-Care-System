import {createSlice} from '@reduxjs/toolkit';
import {getWalletDetailThunk} from '../../apiThunk/walletThunk';

export const walletDetailSlice = createSlice({
  name: 'walletDetail',
  initialState: {
    entities: [],
    draft: [],
    loading: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder

      .addCase(getWalletDetailThunk.pending, state => {
        state.loading = true;
        state.loading = 'loading';
        state.error = null;
      })
      .addCase(getWalletDetailThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.loading = 'succeeded';
        state.entities = action.payload;
      })
      .addCase(getWalletDetailThunk.rejected, (state, action) => {
        state.loading = false;
        state.loading = 'failed';
        state.error = action.payload;
      });
  },
});

export default walletDetailSlice.reducer;
