/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/app/api/api';
import { RootState } from '@/app/store';
import { Product, ProductSlice } from '@/app/api/models';

const initialState: ProductSlice = {
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
  async (
    {
      id,
      reviewPage,
      reviewPerPage,
    }: { id: string; reviewPage: number; reviewPerPage: number },
    { getState, rejectWithValue }
  ) => {
    try {
      const state = getState() as RootState;

      // Check if the product is already in the state

      const { product } = state.products;

      if (product?.id === id) {
        return product;
      }

      const response = await api.productById(id);

      const reviewsResponse = await api.reviewsByProductId(
        id,
        reviewPage,
        reviewPerPage
      );

      return {
        ...response.data,
        reviews: reviewsResponse.data,
      };
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getReviewsByProductId = createAsyncThunk(
  'reviews',
  async (
    { id, page, perPage }: { id: string; page: number; perPage: number },
    { getState, rejectWithValue }
  ) => {
    try {
      const state = getState() as RootState;

      // Check if the product is already in the state
      const { product } = state.products;

      if (
        product?.id === id &&
        product?.reviews &&
        page === product.reviews?.page &&
        perPage === product.reviews?.perPage
      ) {
        return product.reviews;
      }
      const response = await api.reviewsByProductId(id, page, perPage);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const reviewProduct = createAsyncThunk(
  'review',
  async (
    { id, data }: { id: string; data: { rating: number; comment: string } },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.reviewProduct(id, data);
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
    builder.addCase(getReviewsByProductId.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getReviewsByProductId.fulfilled, (state, action) => {
      state.loading = false;
      state.product = {
        ...(state.product as Product),
        reviews: action.payload,
      };
    });
  },
});

export default productSlice.reducer;
