import { MapContainer, Marker, TileLayer, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import { Icon } from "leaflet";
import type { Team } from "../pages/play/index";

interface Props {
  teams: Team[];
}

export default function DynamicMap({ teams }: Props) {
  return (
    <MapContainer
      center={[51.505, -0.09]}
      zoom={13}
      scrollWheelZoom={true}
      className="h-full"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {teams.map((team) => (
        <Marker
          position={[team.latitude, team.longitude]}
          key={team.id}
          icon={
            new Icon({
              iconUrl: markerIconPng.src,
              iconSize: [25, 41],
              iconAnchor: [12, 41],
            })
          }
        >
          <Popup>{team.name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
