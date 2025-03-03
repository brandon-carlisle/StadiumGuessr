import { mapActions } from "@/store/features/map/map-slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Map, ViewStateChangeEvent } from "@vis.gl/react-maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { useCallback } from "react";

function MapView() {
  const dispatch = useAppDispatch();
  const mapStyle = useAppSelector((state) => state.map.mapStyle);
  const viewState = useAppSelector((state) => state.map.viewState);

  const onMove = useCallback((event: ViewStateChangeEvent) => {
    dispatch(
      mapActions.update({
        latitude: event.viewState.latitude,
        longitude: event.viewState.longitude,
        zoom: event.viewState.zoom,
      }),
    );
  }, []);

  return (
    <Map
      {...viewState}
      style={{ width: "100%", height: "100%" }}
      mapStyle={mapStyle}
      onMove={onMove}
    />
  );
}

export function MapContainer() {
  return (
    <div className="flex-grow md:w-2/3 bg-muted flex items-center justify-center border rounded-lg">
      <div className="container h-full w-full">
        <MapView />
      </div>
    </div>
  );
}
