import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { Roboto } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { Provider as ReduxProvider } from "react-redux";

import "@/styles/globals.css";

import { api } from "@/utils/api";

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
      <ReduxProvider store={reduxStore}>
        <div className={`${roboto.variable} font-sans`}>
          <Component {...pageProps} />
          <Toaster
            position="bottom-center"
            toastOptions={{
              style: {
                backgroundColor: "rgb(29, 35, 42)",
                border: "1px solid rgb(186, 33, 145)",
                color: "rgb(255, 255, 255)",
                borderRadius: "8px",
                fontSize: "18px",
              },
            }}
            containerStyle={{ bottom: 100 }}
          />
        </div>
      </ReduxProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
