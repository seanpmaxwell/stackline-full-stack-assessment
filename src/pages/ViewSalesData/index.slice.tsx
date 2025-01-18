import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { IProduct } from '../../models/Product';
import fetchProductMock from '../../__test__/fetchProductMock';


// **** Types **** //

export interface IState {
  productId: string;
  data: IProduct | null;
  filter: string;
  fetchProductStatus: {
    isLoading: boolean;
    isError: boolean;
  };
}


// **** Setup **** //

// Fetch Proudct API call
export const fetchProduct = createAsyncThunk(
  'fetchTodos',
  async (params: { productId: string, filter: string }) => {
    const resp = await fetchProductMock(params.productId, params.filter);
    return resp;
  },
);

// Setup slice
const slice = createSlice({
  name: 'redux',
  initialState: {
    productId: '',
    data: null,
    filter: '',
    fetchProductStatus: {
      isLoading: false,
      isError: false,
    },
  } as IState,
  reducers: {
    setProductId: (state, action) => {
      state.productId = action.payload;
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchProduct.pending, state => {
      state.fetchProductStatus.isLoading = true;
    });
    builder.addCase(fetchProduct.fulfilled, (state, action) => {
      state.fetchProductStatus.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchProduct.rejected, state => {
      state.fetchProductStatus.isError = true;
    });
  },
});


// **** Export Default **** //

export const { actions } = slice;
export default slice.reducer;
