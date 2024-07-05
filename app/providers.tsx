'use client'

import {NextUIProvider} from '@nextui-org/react'

import { MetadataContextProvider } from '@/src/stores/contexts/metadataStateContext'
import { LocalStateContextProvider } from '@/src/stores/contexts/localStateContext'
import { QQResponseContextProvider } from '@/src/stores/contexts/quickQuoteStateContext'

export function Providers({children}: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <LocalStateContextProvider>
        <MetadataContextProvider>
          <QQResponseContextProvider>
                {children}
            </QQResponseContextProvider>
        </MetadataContextProvider>
      </LocalStateContextProvider>
    </NextUIProvider>
  )
}