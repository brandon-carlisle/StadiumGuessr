import { store } from "@/store/store";
import {
  createRootRouteWithContext,
  useMatches,
  Outlet,
} from "@tanstack/react-router";
import { ReactNode, useEffect } from "react";
import { Provider } from "react-redux";

const BASE_TITLE = "StadiumGuessr";

type RootRouteContext = object;

export const Route = createRootRouteWithContext<RootRouteContext>()({
  component: RootComponent,
  staticData: {
    meta: {
      title: BASE_TITLE,
    },
  },
});

function Meta({ children }: { children: ReactNode }) {
  const matches = useMatches();
  const titles: string[] = [];

  for (let i = 0; i < matches.length; i++) {
    titles.push(matches[i].staticData.meta.title);
  }

  useEffect(() => {
    document.title = titles.join(" · ");
  }, [titles]);

  return children;
}

function RootComponent() {
  return (
    <>
      <Provider store={store}>
        <Meta>
          <Outlet />
        </Meta>
      </Provider>
    </>
  );
}
