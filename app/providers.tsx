'use client'

import {NextUIProvider} from '@nextui-org/react'

import { MetadataContextProvider } from '@/src/stores/contexts/metadataStateContext'
import { LocalStateContextProvider } from '@/src/stores/contexts/localStateContext'
import { QQResponseContextProvider } from '@/src/stores/contexts/quickQuoteStateContext'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient();

export function Providers({children}: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
    <NextUIProvider>
      <LocalStateContextProvider>
        <MetadataContextProvider>
          <QQResponseContextProvider>
              {children}
            </QQResponseContextProvider>
        </MetadataContextProvider>
      </LocalStateContextProvider>
    </NextUIProvider>
    <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}