import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: HomeComponent,
  meta: () => [
    {
      title: "test",
    },
  ],
});

function HomeComponent() {
  return (
    <div className="p-2">
      <h3 className="text-red-500">Welcome Home!</h3>
      <button className="btn btn-primary">Hello</button>
    </div>
  );
}
