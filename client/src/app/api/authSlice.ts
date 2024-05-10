/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '@/app/store';
import api from '@/app/api/api';
import { AuthSlice } from './models';

export const loginUser = createAsyncThunk(
  'auth/login',
  async (form: { username: string; password: string }) => {
    try {
      const response = await api.login(form);

      const { access_token } = response.data;

      document.cookie = `access_token=${access_token}; path=/`;

      return response.data;
    } catch (error: any) {
      return Promise.reject(error.response.data);
    }
  }
);

export const getCurrentUser = createAsyncThunk(
  'auth/',
  async (_, { getState }) => {
    try {
      const state = getState() as RootState;

      if (document.cookie.indexOf('access_token=') === -1) {
        return Promise.reject();
      }

      if (state.auth.attempttedCurrentUser) {
        return state.auth.user;
      }

      const response = await api.getCurrentUser();
      return response.data;
    } catch (error: any) {
      return Promise.reject(error.response.data);
    }
  }
);

export const logoutUser = createAsyncThunk('auth/logout', async () => {
  try {
    await api.logout();

    return Promise.resolve();
  } catch (error: any) {
    return Promise.reject(error.response.data);
  }
});

export const registerUser = createAsyncThunk(
  'auth/signup',
  async (form: {
    username: string;
    email: string;
    password: string;
    name: string;
  }) => {
    try {
      const response = await api.register(form);

      const { access_token } = response.data;

      document.cookie = `access_token=${access_token}`;

      return response.data;
    } catch (error: any) {
      return Promise.reject(error.response.data);
    }
  }
);

export const addProductToCart = createAsyncThunk(
  'user/shopping_cart/add',
  async (data: { product_id: string; quantity: number }, { getState }) => {
    try {
      const state = getState() as RootState;

      const response = await api.addProductToCart(
        data.product_id,
        data.quantity
      );

      // if the product is already on the cart, find it and remove it from the cart and add it again with the new quantity
      const foundProd = state.auth.user?.shopping_cart.products.find(
        (prod) => prod.product.id === data.product_id
      );

      if (foundProd) {
        return {
          ...state.auth.user?.shopping_cart,
          products: state.auth.user!.shopping_cart.products.map((prod) => {
            if (prod.product.id === data.product_id) {
              return {
                ...prod,
                quantity: data.quantity,
              };
            }

            return prod;
          }),
        };
      }

      return {
        ...state.auth.user?.shopping_cart,
        products: [...state.auth.user!.shopping_cart.products, response.data],
      };
    } catch (error: any) {
      console.log(error);
      return Promise.reject(error.response.data);
    }
  }
);

export const removeProductFromCart = createAsyncThunk(
  'user/shopping_cart/remove',
  async (cart_item_id: string, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;

      await api.removeProductFromCart(cart_item_id);

      return {
        ...state.auth.user?.shopping_cart,
        products: state.auth.user!.shopping_cart.products.filter(
          (prod) => prod.id !== cart_item_id
        ),
      };
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Define initial state
const initialState: AuthSlice = {
  user: null,
  loading: false,
  error: '',
  attempttedCurrentUser: false,
};

// Define the slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state) => {
        state.loading = false;
        state.error = 'Invalid credentials. Please try again.';
        state.user = null;
      })
      .addCase(getCurrentUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCurrentUser.rejected, (state) => {
        state.loading = false;
        state.user = null;
        state.attempttedCurrentUser = true;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.attempttedCurrentUser = true;
      })
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.attempttedCurrentUser = false;
        document.cookie =
          'access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      })
      .addCase(logoutUser.rejected, (state) => {
        state.loading = false;
        state.error = 'Failed to logout. Please try again.';
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state) => {
        state.loading = false;
        state.error = 'Failed to register. Please try again.';
      })
      .addCase(addProductToCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(addProductToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.user!.shopping_cart = action.payload as any;
      })
      .addCase(addProductToCart.rejected, (state) => {
        state.loading = false;
        state.error = 'Failed to add product to cart. Please try again.';
      })
      .addCase(removeProductFromCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeProductFromCart.fulfilled, (state, action) => {
        state.loading = false;
        state.user!.shopping_cart = action.payload as any;
      })
      .addCase(removeProductFromCart.rejected, (state) => {
        state.loading = false;
        state.error = 'Failed to remove product from cart. Please try again.';
      });
  },
});

export default authSlice.reducer;
