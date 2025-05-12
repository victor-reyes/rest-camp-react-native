import { filtersSlice } from "@/slices/filters";
import { restAreasSlice, restAreasApi } from "@/slices/rest-areas";
import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import devtoolsEnhancer from "redux-devtools-expo-dev-plugin";

export const store = configureStore({
  reducer: {
    restAreas: restAreasSlice.reducer,
    filters: filtersSlice.reducer,
    [restAreasApi.reducerPath]: restAreasApi.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(restAreasApi.middleware),
  devTools: false,
  enhancers: getDefaultEnhancers => getDefaultEnhancers().concat(devtoolsEnhancer()),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
