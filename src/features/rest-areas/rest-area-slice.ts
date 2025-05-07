import { createSlice } from "@reduxjs/toolkit";
import { Parking } from "./api/schemas";

type RestArea = Parking;

export type RestAreasState = {
  restAreas: RestArea[];
};

const initialState: RestAreasState = {
  restAreas: [],
};

export const restAreasSlice = createSlice({
  name: "restAreas",
  initialState,
  reducers: {
    setRestAreas: (state, action) => {
      state.restAreas = action.payload;
    },
  },
});
