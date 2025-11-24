import {
  HeadContent,
  Scripts,
  createRootRouteWithContext,
  useRouterState,
  Outlet,
} from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'
import { StrictMode, useEffect, useMemo } from 'react'
import { Toaster } from 'react-hot-toast'
import { Provider } from 'react-redux'

import { AudioProvider } from '@/components/audio-provider'
import { useAppSelector } from '@/store/hooks'
import { store } from '@/store/store'

import TanStackQueryDevtools from '../integrations/tanstack-query/devtools'

import appCss from '../styles.css?url'

import type { QueryClient } from '@tanstack/react-query'

const BASE_TITLE = 'StadiumGuessr'

interface MyRouterContext {
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  head: () => {
    return {
      meta: [
        {
          charSet: 'utf-8',
        },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1',
        },
        {
          title: BASE_TITLE,
        },
      ],
      links: [
        {
          rel: 'stylesheet',
          href: appCss,
        },
      ],
    }
  },

  shellComponent: RootDocument,
  component: RootComponent,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <TanStackDevtools
          config={{
            position: 'bottom-right',
          }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
            TanStackQueryDevtools,
          ]}
        />
        <Scripts />
      </body>
    </html>
  )
}

function Meta({ children }: { children: React.ReactNode }) {
  // Use useRouterState for better reactivity instead of useMatches()
  const matches = useRouterState({
    select: (state) => state.matches,
  })

  const titles = useMemo(
    () =>
      matches
        .map((match) => {
          // Access head meta title - runtime structure includes meta.title even if types don't
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const staticData = match.staticData as any
          return staticData?.meta?.title as string | undefined
        })
        .filter((title): title is string => typeof title === 'string'),
    [matches],
  )

  useEffect(() => {
    if (titles.length > 0) {
      document.title = titles.join(' · ')
    } else {
      document.title = BASE_TITLE
    }
  }, [titles])

  return <>{children}</>
}

function RootComponent() {
  const isDevMode = import.meta.env.VITE_DEV_MODE === 'TRUE'

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
  )
}

function WithDevMode() {
  return (
    <StatusIndicator>
      <Outlet />
    </StatusIndicator>
  )
}

function StatusIndicator({ children }: { children?: React.ReactNode }) {
  const status = useAppSelector((state) => state.game.status)

  return (
    <div className="indicator w-full">
      <span className="indicator-item indicator-center badge badge-secondary mt-5">
        {status}
      </span>
      <div className="w-full">{children}</div>
    </div>
  )
}
