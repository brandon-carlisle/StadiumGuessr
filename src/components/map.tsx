import { Map } from "@vis.gl/react-maplibre";
import "maplibre-gl/dist/maplibre-gl.css";

export default function VisGlMap() {
  return (
    <Map
      initialViewState={{
        longitude: 51.556667,
        latitude: -0.106111,
        zoom: 2,
      }}
      mapStyle="https://demotiles.maplibre.org/style.json"
    ></Map>
  );
}

// import { type LatLngExpression } from "leaflet";
// import "leaflet/dist/leaflet.css";
// import { useEffect } from "react";
// import { MapContainer, TileLayer, useMap } from "react-leaflet";
//
// // import { useAppSelector } from "@/store/hooks";
//
// const TEMP_CENTER = [0, 0] as LatLngExpression;
// const INTIAL_ZOOM = 17;
//
// function MapSubscriber() {
//   // const stadium = useAppSelector((state) => state.game.currentStadium);
//
//   const map = useMap();
//
//   useEffect(() => {
//     // if (stadium) {
//     map.setView(TEMP_CENTER, INTIAL_ZOOM);
//     // }
//   }, [map]);
//
//   return null;
// }
//
// export default function LeafletMap() {
//   useEffect(() => {
//     console.log("Ready");
//   }, []);
//
//   return (
//     <>
//       <MapContainer
//         center={TEMP_CENTER}
//         zoom={INTIAL_ZOOM}
//         scrollWheelZoom={true}
//         className="h-min"
//       >
//         <MapSubscriber />
//         <TileLayer
//           attribution="Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
//           url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
//         />
//       </MapContainer>
//     </>
//   );
// }
