import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './rootReducer';

export const initialredux = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV === 'development',
});