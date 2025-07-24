import { authSlice } from "@/features/auth";
import { filtersSlice } from "@/features/filters";
import { offlineRestAreasApi, restAreasApi } from "@/features/rest-areas";
import { photosApi, offlinePhotosApi } from "@/features/photos";
import { profilesApi, offlineProfilesApi } from "@/features/profiles";
import { reviewsApi, offlineReviewsApi } from "@/features/reviews";
import { servicesApi, offlineServicesApi } from "@/features/services";
import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import devtoolsEnhancer from "redux-devtools-expo-dev-plugin";

export const store = configureStore({
  reducer: {
    filters: filtersSlice.reducer,
    auth: authSlice.reducer,
    [restAreasApi.reducerPath]: restAreasApi.reducer,
    [offlineRestAreasApi.reducerPath]: offlineRestAreasApi.reducer,
    [photosApi.reducerPath]: photosApi.reducer,
    [offlinePhotosApi.reducerPath]: offlinePhotosApi.reducer,
    [profilesApi.reducerPath]: profilesApi.reducer,
    [offlineProfilesApi.reducerPath]: offlineProfilesApi.reducer,
    [reviewsApi.reducerPath]: reviewsApi.reducer,
    [offlineReviewsApi.reducerPath]: offlineReviewsApi.reducer,
    [servicesApi.reducerPath]: servicesApi.reducer,
    [offlineServicesApi.reducerPath]: offlineServicesApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat([
      restAreasApi.middleware,
      offlineRestAreasApi.middleware,
      photosApi.middleware,
      offlinePhotosApi.middleware,
      profilesApi.middleware,
      offlineProfilesApi.middleware,
      reviewsApi.middleware,
      offlineReviewsApi.middleware,
      servicesApi.middleware,
      offlineServicesApi.middleware,
    ]),
  devTools: false,
  enhancers: getDefaultEnhancers => getDefaultEnhancers().concat(devtoolsEnhancer()),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
