import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { type LatLngExpression } from "leaflet";

const TEMP_CENTER = [51.481667, -0.191111] as LatLngExpression;
const TEMP_ZOOM = 17;

export default function DynamicMap() {
  return (
    <>
      <MapContainer
        center={TEMP_CENTER}
        zoom={TEMP_ZOOM}
        scrollWheelZoom={true}
        className="h-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </>
  );
}
