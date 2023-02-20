import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { type LatLngExpression } from "leaflet";
import { useEffect } from "react";
import { useAppSelector } from "../store/hooks";

const TEMP_CENTER = [
  55.41569544345857, -1.7058989440046168,
] as LatLngExpression;
const INTIAL_ZOOM = 17;

function MapSubscriber() {
  const team = useAppSelector((state) => state.game.currentTeam);

  const map = useMap();
  useEffect(() => {
    if (team) {
      map.flyTo([team?.latitude, team?.longitude] as LatLngExpression);
    }
  }, [map, team]);

  return null;
}

export default function DynamicMap() {
  return (
    <MapContainer
      center={TEMP_CENTER}
      zoom={INTIAL_ZOOM}
      scrollWheelZoom={true}
      className="h-full"
    >
      <MapSubscriber />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  );
}
