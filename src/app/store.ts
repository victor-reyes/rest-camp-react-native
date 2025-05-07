import { configureStore } from "@reduxjs/toolkit";
import { restAreasSlice } from "../features/rest-areas/rest-area-slice";
import devToolsEnhancer from "redux-devtools-expo-dev-plugin";
import { restAreasApi } from "@/features/rest-areas/api";

export const store = configureStore({
  reducer: {
    restAreas: restAreasSlice.reducer,
    [restAreasApi.reducerPath]: restAreasApi.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(restAreasApi.middleware),
  devTools: false,
  enhancers: getDefaultEnhancers => getDefaultEnhancers().concat(devToolsEnhancer()),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
