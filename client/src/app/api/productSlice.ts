/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import nProgress from 'nprogress';
import api from '@/app/api/api';
import { RootState } from '@/app/store';
import {
  Category,
  Pagination,
  Product,
  ProductSlice,
  Review,
} from '@/app/api/models';

const initialState: ProductSlice = {
  featuredProducts: [],
  products: [],
  popular: [],
  categories: [],
  product: null,
  loadingProducts: false,
  loadingProduct: false,
  loadingReviews: false,
  loadingFeatured: false,
  loadingPopular: false,
  loadingCategories: false,
  error: null,
  lastFetchedProducts: 0, // Timestamp indicating when products were last fetched
  lastFetchedFeatured: 0,
  lastFetchedPopular: 0,
};

// Create a time threshold for caching (e.g., 5 minutes)
const CACHE_TIME_THRESHOLD = 25 * 60 * 1000; // 5 minutes in milliseconds

export const fetchProducts = createAsyncThunk(
  'products',
  async (
    pageInfo: {
      page: number;
      perPage: number;
      search: string;
      category_id: string;
      minPrice: number;
      maxPrice: number;
    }
  ) => {

    try {
      const response = await api.productsPagination(
        pageInfo.page,
        pageInfo.perPage,
        pageInfo.search,
        pageInfo.category_id,
        pageInfo.minPrice,
        pageInfo.maxPrice
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

export const featuredProducts = createAsyncThunk(
  'featured',
  async (_, { getState }) => {
    const state = getState() as RootState;

    if (
      Date.now() - state.products.lastFetchedFeatured <
      CACHE_TIME_THRESHOLD
    ) {
      return state.products.featuredProducts;
    }

    try {
      const response = await api.featuredProducts();
      return response.data;
    } catch (error) {
      return Promise.reject();
    }
  }
);

export const resetReviewPagination = createAsyncThunk(
  'resetReviewPagination',
  async (_, { getState }) => {
    const state = getState() as RootState;

    if (!state.products.product) {
      return;
    }

    const { product } = state.products;

    try {
      const response = await api.reviewsByProductId(
        product.id,
        1,
        product.reviews.perPage
      );
      return response.data;
    } catch (error: any) {
      return Promise.reject(error.response.data);
    }
  }
);

export const fetchPopularProducts = createAsyncThunk(
  'popular',
  async (_, { getState }) => {
    const state = getState() as RootState;

    if (Date.now() - state.products.lastFetchedPopular < CACHE_TIME_THRESHOLD) {
      return state.products.popular;
    }

    try {
      const response = await api.popularProducts();
      return response.data;
    } catch (error) {
      return Promise.reject();
    }
  }
);

export const fetchCategories = createAsyncThunk(
  'categories',
  async (_, { getState }) => {
    const state = getState() as RootState;

    if (
      state.products.categories.length &&
      Date.now() - state.products.lastFetchedProducts < CACHE_TIME_THRESHOLD
    ) {
      return state.products.categories;
    }

    try {
      const response = await api.categories();
      return response.data;
    } catch (error) {
      return Promise.reject();
    }
  }
);

const onLoad = (
  state: ProductSlice,
  loadingVariable: string = 'loadingProducts'
) => {
  nProgress.start();
  if (loadingVariable === 'loadingProducts') {
    state.loadingProducts = true;
  } else if (loadingVariable === 'loadingProduct') {
    state.loadingProduct = true;
  } else if (loadingVariable === 'loadingReviews') {
    state.loadingReviews = true;
  } else if (loadingVariable === 'loadingFeatured') {
    state.loadingFeatured = true;
  } else if (loadingVariable === 'loadingPopular') {
    state.loadingPopular = true;
  } else if (loadingVariable === 'loadingCategories') {
    state.loadingCategories = true;
  }
};

const onFail = (
  state: ProductSlice,
  error: object,
  loadingVariable: string = 'loadingProducts'
) => {
  if (loadingVariable === 'loadingProducts') {
    state.loadingProducts = false;
  } else if (loadingVariable === 'loadingProduct') {
    state.loadingProduct = false;
  } else if (loadingVariable === 'loadingReviews') {
    state.loadingReviews = false;
  } else if (loadingVariable === 'loadingFeatured') {
    state.loadingFeatured = false;
  } else if (loadingVariable === 'loadingPopular') {
    state.loadingPopular = false;
  } else if (loadingVariable === 'loadingCategories') {
    state.loadingCategories = false;
  }
  state.error = error;
  nProgress.done();
};

const onSuccess = <T>(
  state: ProductSlice,
  data: T,
  loadingVariable: string = 'loadingProducts'
) => {
  if (loadingVariable === 'loadingProducts') {
    state.loadingProducts = false;
    state.products = data as Product[];
    state.lastFetchedProducts = Date.now();
  } else if (loadingVariable === 'loadingProduct') {
    state.loadingProduct = false;
    state.product = data as Product;
  } else if (loadingVariable === 'loadingReviews') {
    state.loadingReviews = false;
    state.product = {
      ...(state.product as Product),
      reviews: data as Pagination<Review>,
    };
  } else if (loadingVariable === 'loadingFeatured') {
    state.loadingFeatured = false;
    state.featuredProducts = data as Product[];
    state.lastFetchedFeatured = Date.now();
  } else if (loadingVariable === 'loadingPopular') {
    state.loadingPopular = false;
    state.popular = data as Product[];
    state.lastFetchedPopular = Date.now();
  } else if (loadingVariable === 'loadingCategories') {
    state.loadingCategories = false;
    state.categories = data as Category[];
  }
  state.error = null;
  nProgress.done();
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) =>
      onLoad(state, 'loadingProducts')
    );
    builder.addCase(fetchProducts.fulfilled, (state, action) =>
      onSuccess(state, action.payload, 'loadingProducts')
    );
    builder.addCase(fetchProducts.rejected, (state, action) =>
      onFail(state, action.payload as object, 'loadingProducts')
    );
    builder.addCase(getProductById.pending, (state) =>
      onLoad(state, 'loadingProduct')
    );
    builder.addCase(getProductById.fulfilled, (state, action) =>
      onSuccess(state, action.payload, 'loadingProduct')
    );
    builder.addCase(getProductById.rejected, (state, action) =>
      onFail(state, action.payload as object, 'loadingProduct')
    );
    builder.addCase(getReviewsByProductId.pending, (state) =>
      onLoad(state, 'loadingReviews')
    );
    builder.addCase(getReviewsByProductId.fulfilled, (state, action) =>
      onSuccess(state, action.payload, 'loadingReviews')
    );
    builder.addCase(featuredProducts.pending, (state) =>
      onLoad(state, 'loadingFeatured')
    );
    builder.addCase(featuredProducts.fulfilled, (state, action) =>
      onSuccess(state, action.payload, 'loadingFeatured')
    );
    builder.addCase(featuredProducts.rejected, (state, action) =>
      onFail(state, action.payload as object, 'loadingFeatured')
    );
    builder.addCase(resetReviewPagination.fulfilled, (state, action) => {
      state.product = {
        ...(state.product as Product),
        reviews: action.payload as Pagination<Review>,
      };
    });
    builder.addCase(reviewProduct.fulfilled, (state, action) => {
      const p = state.product;

      if (!p) {
        return;
      }
      p.reviews.itemCount! += 1;
      p.reviews.pageCount = Math.ceil(
        p.reviews.itemCount! / p.reviews.perPage!
      );
      p.reviews.hasNext =
        p.reviews.page! * p.reviews.perPage! < p.reviews.itemCount!;
      p.reviews.hasPrev = p.reviews.page! > 1;
      if ((p?.reviews?.content?.length ?? 50) < p.reviews.perPage!) {
        p.reviews.content!.push(action.payload as Review);
      }
    });
    builder.addCase(reviewProduct.rejected, (state, action) => {
      state.error! = action.payload as object;
    });
    builder.addCase(fetchPopularProducts.pending, (state) =>
      onLoad(state, 'loadingPopular')
    );
    builder.addCase(fetchPopularProducts.fulfilled, (state, action) =>
      onSuccess(state, action.payload, 'loadingPopular')
    );
    builder.addCase(fetchPopularProducts.rejected, (state, action) =>
      onFail(state, action.payload as object, 'loadingPopular')
    );
    builder.addCase(fetchCategories.pending, (state) =>
      onLoad(state, 'loadingCategories')
    );
    builder.addCase(fetchCategories.fulfilled, (state, action) =>
      onSuccess(state, action.payload, 'loadingCategories')
    );
    builder.addCase(fetchCategories.rejected, (state, action) =>
      onFail(state, action.payload as object, 'loadingCategories')
    );
  },
});

export default productSlice.reducer;
