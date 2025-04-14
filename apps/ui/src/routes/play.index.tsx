import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/play/")({
  component: RouteComponent,
  staticData: {
    meta: {
      title: "Select a league",
    },
  },
});

function RouteComponent() {
  return (
    <div className="p-2">
      <h1>Please select a league</h1>
    </div>
  );
}
