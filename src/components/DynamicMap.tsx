import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { type LatLngExpression } from "leaflet";
import { useRef, useEffect } from "react";
import { useAppSelector } from "../store/hooks";

const TEMP_CENTER = [0, 0] as LatLngExpression;
const TEMP_ZOOM = 17;

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
  const mapRef = useRef();

  return (
    <MapContainer
      center={TEMP_CENTER}
      zoom={TEMP_ZOOM}
      scrollWheelZoom={true}
      className="h-full"
      // fix this type error
      whenReady={(mapInstance) => {
        mapRef.current = mapInstance;
      }}
    >
      <MapSubscriber />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  );
}
