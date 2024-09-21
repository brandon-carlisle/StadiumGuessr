import { type LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";

import { useAppSelector } from "@/store/hooks";

const TEMP_CENTER = [0, 0] as LatLngExpression;
const INTIAL_ZOOM = 17;

function MapSubscriber() {
  const stadium = useAppSelector((state) => state.game.currentStadium);

  const map = useMap();

  useEffect(() => {
    if (stadium) {
      map.setView([stadium.locaction.lat, stadium.locaction.lng], INTIAL_ZOOM);
    }
  }, [map, stadium]);

  return null;
}

export default function LeafletMap() {
  useEffect(() => {
    console.log("Ready");
  }, []);

  return (
    <>
      <MapContainer
        center={TEMP_CENTER}
        zoom={INTIAL_ZOOM}
        scrollWheelZoom={true}
        className="h-screen"
      >
        <MapSubscriber />
        <TileLayer
          attribution="Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          className="TEST"
        />
      </MapContainer>
    </>
  );
}
