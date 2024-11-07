import {
  createRootRouteWithContext,
  useMatches,
  Outlet,
} from "@tanstack/react-router";
import { ReactNode, useEffect } from "react";

const TITLE = "StadiumGuessr";

interface RootRouteContext {}

export const Route = createRootRouteWithContext<RootRouteContext>()({
  meta: () => [
    {
      title: TITLE,
    },
  ],
  component: RootComponent,
});

function Meta({ children }: { children: ReactNode }) {
  const matches = useMatches();
  const meta = matches.at(-1)?.meta?.find((meta) => meta.title);

  useEffect(() => {
    document.title = [meta?.title, TITLE].filter(Boolean).join(" · ");
  }, [meta]);

  return children;
}

function RootComponent() {
  return (
    <Meta>
      <Outlet />
    </Meta>
  );
}
