/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from './api';
import { RootState } from '../store';

const initialState = {
  products: [],
  product: null,
  loading: false,
  error: '',
  lastFetchedProducts: 0, // Timestamp indicating when products were last fetched
};

// Create a time threshold for caching (e.g., 5 minutes)
const CACHE_TIME_THRESHOLD = 5 * 60 * 1000; // 5 minutes in milliseconds

export const fetchProducts = createAsyncThunk(
  'products',
  async (pageInfo: { page: number; perPage: number }, { getState }) => {
    const state = getState() as RootState;

    // Check if products were fetched within the caching time threshold
    if (
      Date.now() - state.products.lastFetchedProducts <
      CACHE_TIME_THRESHOLD
    ) {
      // Return cached products if within threshold
      return state.products.products;
    }

    try {
      const response = await api.productsPagination(
        pageInfo.page,
        pageInfo.perPage
      );
      return response.data;
    } catch (error: any) {
      return Promise.reject(error.response.data);
    }
  }
);

export const getProductById = createAsyncThunk(
  'product',
  async (id: string, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      // Check if product is already in the store
      const { product } = state.products;
      if ((product as any) && (product as any).id === id) {
        return state.products.product;
      }

      const response = await api.productById(id);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);


const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload;
      state.lastFetchedProducts = Date.now();
    });
    builder.addCase(fetchProducts.rejected, (state) => {
      state.loading = false;
      state.error = 'Error fetching products. Please try again.';
    });
    builder.addCase(getProductById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getProductById.fulfilled, (state, action) => {
      state.loading = false;
      state.product = action.payload;
    });
    builder.addCase(getProductById.rejected, (state) => {
      state.loading = false;
      state.error = 'Error fetching product. Please try again.';
      state.product = null;
    });
  },
});

export default productSlice.reducer;
