import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
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
      </ReduxProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);

// const router = useRouter();
// const [loading, setLoading] = useState<boolean>(false);

// useEffect(() => {
//   const handleStart = (url: string) =>
//     url !== router.asPath && setLoading(true);

//   const handleComplete = (url: string) =>
//     url === router.asPath && setLoading(false);

//   router.events.on("routeChangeStart", handleStart);
//   router.events.on("routeChangeComplete", handleComplete);
//   router.events.on("routeChangeError", handleComplete);

//   return () => {
//     router.events.off("routeChangeStart", handleStart);
//     router.events.off("routeChangeComplete", handleComplete);
//     router.events.off("routeChangeError", handleComplete);
//   };
// });
