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

const CountriesMapApiUrl =
  "https://api.maptiler.com/maps/31aa5771-cc09-4b43-bee4-9ab7f5798252/style.json?key=LGDKympODc3TZnAaVFqw";

const initialState: MapState = {
  // mapStyle: "https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json",
  mapStyle: CountriesMapApiUrl,
  viewState: {
    latitude: 37.8,
    longitude: -122.4,
    zoom: 3,
  },
};

const mapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {
    update(state, view: PayloadAction<ViewState>) {
      state.viewState = view.payload;
    },
    resetZoom(state) {
      state.viewState.zoom = initialState.viewState.zoom;
    },
  },
});

export const mapActions = mapSlice.actions;
export default mapSlice.reducer;
