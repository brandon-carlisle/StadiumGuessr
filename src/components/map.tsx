import { useAppSelector } from "@/store/hooks";
import { Map, ViewState } from "@vis.gl/react-maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { memo } from "react";

// const init = {
//   code: "MUN",
//   club: "Manchester United",
//   names: ["old trafford", "the theatre of dreams"],
//   locaction: { lat: 53.463056, lng: -2.291389 },
// };
//
const demoMapStyle = "https://demotiles.maplibre.org/style.json";
const DEMO = true;

const MapView = memo(function MapView() {
  const locaction = useAppSelector((state) => state.game.currentTeam.locaction);

  // const [viewState] = useState({
  //   longitude: init.locaction.lng,
  //   latitude: init.locaction.lat,
  //   zoom: 3.5,
  // });
  //
  if (DEMO === true) {
    return <Map {...locaction} mapStyle={demoMapStyle}></Map>;
  }

  const viewState: ViewState = {
    latitude: locaction.lat,
    longitude: locaction.lng,
    zoom: 3.5,
    bearing: 0,
    pitch: 1,
    padding: {
      bottom: 0,
      left: 0,
      right: 0,
      top: 0,
    },
  };

  return (
    <Map
      {...viewState}
      mapStyle={{
        version: 8,
        sources: {
          satellite: {
            type: "raster",
            tiles: [
              `https://api.maptiler.com/tiles/satellite-v2/{z}/{x}/{y}.jpg?key=${import.meta.env.VITE_MAPTILER_API_KEY}`,
            ],
            tileSize: 256,
          },
        },
        layers: [
          {
            id: "satellite",
            type: "raster",
            source: "satellite",
            minzoom: 0,
            maxzoom: 4,
          },
        ],
      }}
    ></Map>
  );
});

export default MapView;

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
