import { AudioProvider } from "@/components/audio-provider";
import { useAppSelector } from "@/store/hooks";
import { store } from "@/store/store";
import {
  createRootRouteWithContext,
  useMatches,
  Outlet,
} from "@tanstack/react-router";
import { ReactNode, StrictMode, useEffect } from "react";
import { Toaster } from "react-hot-toast";
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

  for (const match of matches) {
    titles.push(match.staticData.meta.title);
  }

  useEffect(() => {
    document.title = titles.join(" · ");
  }, [titles]);

  return children;
}

function RootComponent() {
  const isDevMode = import.meta.env.VITE_DEV_MODE === "TRUE";

  return (
    <StrictMode>
      <AudioProvider>
        <Provider store={store}>
          <Meta>
            {isDevMode ? <WithDevMode /> : <Outlet />}
            <Toaster />
          </Meta>
        </Provider>
      </AudioProvider>
    </StrictMode>
  );
}

function WithDevMode() {
  return (
    <StatusIndicator>
      <Outlet />
    </StatusIndicator>
  );
}

function StatusIndicator({ children }: { children: ReactNode }) {
  const status = useAppSelector((state) => state.game.status);

  return (
    <div className="indicator w-full">
      <span className="indicator-item indicator-center badge badge-secondary mt-5">
        {status}
      </span>
      <div className="w-full">{children}</div>
    </div>
  );
}
