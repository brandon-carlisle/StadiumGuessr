import MapWithSideLayout from "./map-with-side";

export default function ReviewLayout() {
  return (
    <div className="min-h-dvh flex flex-col p-4 bg-background text-foreground">
      <MapWithSideLayout sideContent={ReviewSidebar()} />
    </div>
  );
}

export function ReviewSidebar() {
  return <div className="md:w-1/3 space-y-4">sideContent</div>;
}

