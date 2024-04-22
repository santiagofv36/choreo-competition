import { combineReducers, configureStore } from '@reduxjs/toolkit';

import authReducer from './api/authSlice';

import productsReducer from './api/productSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import persistStore from 'redux-persist/es/persistStore';

export type RootState = ReturnType<typeof store.getState>;

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  auth: authReducer,
  products: productsReducer,
});

const persistedReduces = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReduces,
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware({
      serializableCheck: false,
    });
  },
});

const persistor = persistStore(store);

export { store, persistor };
