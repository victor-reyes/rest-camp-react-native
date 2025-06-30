import { authSlice } from "@/slices/auth";
import { filtersSlice } from "@/slices/filters";
import { offlineRestAreasApi, restAreasApi } from "@/slices/rest-areas";
import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import devtoolsEnhancer from "redux-devtools-expo-dev-plugin";

export const store = configureStore({
  reducer: {
    filters: filtersSlice.reducer,
    auth: authSlice.reducer,
    [restAreasApi.reducerPath]: restAreasApi.reducer,
    [offlineRestAreasApi.reducerPath]: offlineRestAreasApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat([restAreasApi.middleware, offlineRestAreasApi.middleware]),
  devTools: false,
  enhancers: getDefaultEnhancers => getDefaultEnhancers().concat(devtoolsEnhancer()),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
