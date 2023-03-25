import { type Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { type AppType } from 'next/app';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Provider as ReduxProvider } from 'react-redux';

import { store } from '@store/store';

import '../styles/globals.css';

function Loading() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <progress className="progress progress-primary w-56"></progress>
    </div>
  );
}

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const handleStart = (url: string) =>
      url !== router.asPath && setLoading(true);

    const handleComplete = (url: string) =>
      url === router.asPath && setLoading(false);

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  });

  return (
    <SessionProvider session={session}>
      <ReduxProvider store={store}>
        {loading ? <Loading /> : <Component {...pageProps} />}
      </ReduxProvider>
    </SessionProvider>
  );
};

export default MyApp;
