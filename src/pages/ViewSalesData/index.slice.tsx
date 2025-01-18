import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { getBlankProduct, IProduct } from '../../models/Product';
import fetchProductMock from '../../__test__/fetchProductMock';


// **** Variables **** //

const cache = new Map<string, IProduct>();


// **** Types **** //

export interface IViewSalesDataState {
  productId: string;
  data: IProduct;
  filter: string;
  fetchProductStatus: {
    isLoading: boolean;
    isError: boolean;
    error: unknown;
  };
  salesDataFull: IProduct['sales'];
  fetchAllSalesDataStatus: {
    isLoading: boolean;
    isError: boolean;
    error: unknown;
  };
}

interface IFetchProductParams {
  productId: string;
  filter: string;
}


// **** Setup **** //

/**
 * NOTE: In real-world app we would use "createApi" so we can cache our data,
 * but I'm just using createAsyncThunk since we're calling a mock API.
 */
export const fetchProduct = createAsyncThunk(
  'fetchProduct',
  async (params: IFetchProductParams, { rejectWithValue }) => {
    try {
      const { productId, filter } = params,
        key = `/api/product/${productId}?${filter}`,
        cacheData = cache.get(key);
      let resp;
      if (!!cacheData) {
        return cacheData;
      } else {
        resp = await fetchProductMock(productId, filter);
        cache.set(key, resp);
      }
      return resp;
    } catch (err: any) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  },
);

/**
 * For the line graph
 */
export const fetchAllSalesData = createAsyncThunk(
  'fetchAllSalesData',
  async (params: { productId: string }, { rejectWithValue }) => {
    try {
      const { productId } = params,
        resp = await fetchProductMock(productId, '');
      return resp.sales;
    } catch (err: any) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  },
);

// Setup slice
const slice = createSlice({
  name: 'redux',
  initialState: {
    productId: '',
    data: getBlankProduct(),
    filter: '',
    fetchProductStatus: {
      isLoading: false,
      isError: false,
      error: null,
    },
    salesDataFull: {
      meta: {
        totalCount: 0,
        pageSize: 0,
        offset: 0,
      },
      data: [],
    },
    fetchAllSalesDataStatus: {
      isLoading: false,
      isError: false,
      error: null,
    },
  } as IViewSalesDataState,
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
    builder.addCase(fetchProduct.rejected, (state, action) => {
      state.fetchProductStatus.isLoading = false;
      state.fetchProductStatus.isError = true;
      state.fetchProductStatus.error = action.error.message;
    });
    builder.addCase(fetchAllSalesData.pending, state => {
      state.fetchAllSalesDataStatus.isLoading = true;
    });
    builder.addCase(fetchAllSalesData.fulfilled, (state, action) => {
      state.fetchAllSalesDataStatus.isLoading = false;
      state.salesDataFull = action.payload;
    });
    builder.addCase(fetchAllSalesData.rejected, (state, action) => {
      state.fetchAllSalesDataStatus.isLoading = false;
      state.fetchAllSalesDataStatus.isError = true;
      state.fetchAllSalesDataStatus.error = action.error.message;
    });
  },
});


// **** Export Default **** //

export const { actions } = slice;
export default slice.reducer;
