import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { type Prisma } from "@prisma/client";

interface Props {
  teams: Prisma.TeamSelect[];
}

export default function DynamicMap({ teams }: Props) {
  console.log("Map teams: ", teams);

  const [teamOne] = teams;

  console.log(teamOne?.stadium);

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
    </MapContainer>
  );
}
