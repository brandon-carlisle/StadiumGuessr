import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { env } from "@/env";

interface ViewState {
	latitude: number;
	longitude: number;
	zoom: number;
}

interface MarkerPosition {
	lat: number;
	lng: number;
}

interface MapState {
	mapStyle: string;
	viewState: ViewState;
	markerPosition: MarkerPosition | null;
}

const CountriesMapApiUrl = `https://api.maptiler.com/maps/31aa5771-cc09-4b43-bee4-9ab7f5798252/style.json?key=${env.VITE_MAPTILER_KEY}`;

const initialState: MapState = {
	mapStyle: CountriesMapApiUrl,
	viewState: {
		latitude: 54.5,
		longitude: -2.5,
		zoom: 5,
	},
	markerPosition: null,
};

const mapSlice = createSlice({
	name: "map",
	initialState,
	reducers: {
		update(state, view: PayloadAction<ViewState>) {
			state.viewState = view.payload;
		},
		setMarkerPosition(state, action: PayloadAction<MarkerPosition>) {
			state.markerPosition = action.payload;
		},
		clearMarker(state) {
			state.markerPosition = null;
		},
	},
});

export const mapActions = mapSlice.actions;
export default mapSlice.reducer;
