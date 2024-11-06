import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { Roboto } from "next/font/google";
import Script from "next/script";
import { Toaster } from "react-hot-toast";
import { Provider as ReduxProvider } from "react-redux";

import "@/styles/globals.css";

import { api } from "@/utils/api";

import { SoundProvider } from "@/store/sound-context";
import { reduxStore } from "@/store/store";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-roboto",
});

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <SoundProvider>
        <ReduxProvider store={reduxStore}>
          <div className={`${roboto.variable} font-sans`}>
            <Component {...pageProps} />
            <Script
              src="https://beamanalytics.b-cdn.net/beam.min.js"
              data-token="6f2db98d-6358-4902-ba02-428b8b9fb04f"
              async
            />
            <Toaster
              position="bottom-center"
              toastOptions={{
                style: {
                  backgroundColor: "rgb(23, 18, 18)",
                  color: "rgb(255, 255, 255)",
                  borderRadius: "8px",
                  fontSize: "16px",
                  textAlign: "center",
                },
              }}
              containerStyle={{ bottom: 150 }}
            />
          </div>
        </ReduxProvider>
      </SoundProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
