import { configureStore } from '@reduxjs/toolkit';
import { productListReducer } from './reducers/productReducers';

const store = configureStore({
  reducer: {
    productList: productListReducer,
  },
  preloadedState: {},
  devTools: process.env.NODE_ENV !== 'production', //only show devTools when in production
});

export default store;
