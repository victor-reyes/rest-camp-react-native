import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { restAreasApi } from "./api";
import { Parking } from "./types";
import { db, parkings, photos, services } from "@/db";
import equal from "fast-deep-equal";
import { RootState } from "@/app/store";

type RestArea = Parking;

export type RestAreasState = {
  restAreas: RestArea[];
};

const initialState: RestAreasState = {
  restAreas: [],
};

export const loadRestAreas = createAsyncThunk(
  "restAreas/loadRestAreas",
  async () => await db.query.parkings.findMany({ with: { services: true, photos: true } }),
);
export const restAreasSlice = createSlice({
  name: "restAreas",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(loadRestAreas.fulfilled, (state, { payload }) => {
      if (!equal(state.restAreas, payload)) state.restAreas = payload;
    });
    builder.addMatcher(restAreasApi.endpoints.getParkings.matchFulfilled, (_, { payload }) => {
      db.transaction(async tx => {
        try {
          await tx.delete(parkings);
          await tx.delete(services);
          await tx.delete(photos);
          await tx.insert(parkings).values(payload.parkings);
          await tx.insert(services).values(payload.services);
          await tx.insert(photos).values(payload.photos);
        } catch (error) {
          console.error("Error inserting data into the database:", error);
        }
      });
    });
  },
});

export const selectRestAreas = (state: RootState) => state.restAreas.restAreas;
export const selectRestAreaById = (state: { restAreas: RestAreasState }, id: string) =>
  state.restAreas.restAreas.find(restArea => restArea.id === id);
