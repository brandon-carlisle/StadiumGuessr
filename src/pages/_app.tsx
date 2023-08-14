import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { Toaster } from "react-hot-toast";
import { Provider as ReduxProvider } from "react-redux";

import "@/styles/globals.css";

import { api } from "@/utils/api";

import { reduxStore } from "@/store/store";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <ReduxProvider store={reduxStore}>
        <Component {...pageProps} />
        <Toaster
          position="bottom-center"
          toastOptions={{
            style: {
              backgroundColor: "rgb(36, 43, 51)",
              color: "rgb(166, 173, 186)",
              borderRadius: "8px",
              fontSize: "18px",
            },
          }}
        />
      </ReduxProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
