import { MapContainer } from "@/components/map";

interface MapWithSideLayoutProps {
  sideContent: React.JSX.Element;
}

export default function MapWithSideLayout(props: MapWithSideLayoutProps) {
  return (
    <div className="flex-grow flex flex-col md:flex-row gap-4 mb-4">
      <MapContainer />
      {props.sideContent}
    </div>
  );
}

