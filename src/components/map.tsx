import { mapActions } from "@/store/features/map/map-slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Map, Marker, ViewStateChangeEvent } from "@vis.gl/react-maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { useCallback } from "react";

function MapView() {
  const dispatch = useAppDispatch();
  const mapStyle = useAppSelector((state) => state.map.mapStyle);
  const viewState = useAppSelector((state) => state.map.viewState);
  const markerPosition = useAppSelector((state) => state.map.markerPosition);
  const status = useAppSelector((state) => state.game.status);

  const onMove = useCallback((event: ViewStateChangeEvent) => {
    dispatch(
      mapActions.update({
        latitude: event.viewState.latitude,
        longitude: event.viewState.longitude,
        zoom: event.viewState.zoom,
      }),
    );
  }, [dispatch]);

  const onClick = useCallback(
    (event: { lngLat: { lat: number; lng: number } }) => {
      if (status !== "PLAYING") {
        return;
      }
      dispatch(
        mapActions.setMarkerPosition({
          lat: event.lngLat.lat,
          lng: event.lngLat.lng,
        }),
      );
    },
    [dispatch, status],
  );

  return (
    <Map
      {...viewState}
      style={{ width: "100%", height: "100%", borderRadius: "0.5rem" }}
      mapStyle={mapStyle}
      onMove={onMove}
      onClick={onClick}
    >
      {markerPosition && (
        <Marker
          latitude={markerPosition.lat}
          longitude={markerPosition.lng}
          color="red"
        />
      )}
    </Map>
  );
}

export function MapContainer() {
  return (
    <div className="grow h-64 md:h-full md:w-2/3 bg-muted flex flex-col items-center justify-center border rounded-lg">
      <div className="container h-full w-full flex-1">
        <MapView />
      </div>
    </div>
  );
}

