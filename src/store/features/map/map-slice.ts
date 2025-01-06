import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ViewState {
  latitude: number;
  longitude: number;
  zoom: number;
}

interface MapState {
  mapStyle: string;
  viewState: ViewState;
}

const initialState: MapState = {
  mapStyle: "https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json",
  viewState: {
    latitude: 37.8,
    longitude: -122.4,
    zoom: 14,
  },
};

const mapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {
    update(state, view: PayloadAction<ViewState>) {
      state.viewState = view.payload;
    },
  },
});

export const mapActions = mapSlice.actions;
export default mapSlice.reducer;
