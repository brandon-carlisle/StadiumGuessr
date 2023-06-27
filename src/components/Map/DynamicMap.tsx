import { type LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';

import { useAppSelector } from '@store/hooks';

const TEMP_CENTER = [
  55.41569544345857, -1.7058989440046168,
] as LatLngExpression;
const INTIAL_ZOOM = 17;

function MapSubscriber() {
  const team = useAppSelector((state) => state.game.currentTeam);

  const map = useMap();
  useEffect(() => {
    if (team) {
      map.setView(
        [team?.latitude, team?.longitude] as LatLngExpression,
        INTIAL_ZOOM,
      );
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
        attribution="Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
      />
    </MapContainer>
  );
}
