import { configureStore } from '@reduxjs/toolkit';
import innerChartApiReducer from './slice/innerChartApiSlice';

export const store = configureStore({
  reducer: {
    innerChartApiData: innerChartApiReducer
  }
});