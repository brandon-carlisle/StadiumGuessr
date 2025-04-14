import ReviewLayout from "@/layouts/review-layout";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/games/$gameId")({
  component: RouteComponent,
  staticData: {
    meta: { title: "Review your game" },
  },
});

function RouteComponent() {
  return <ReviewLayout />;
}
