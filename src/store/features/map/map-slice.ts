import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

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
