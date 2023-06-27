'use client'

import { GeneralProvider } from './general'
import { TransformationProvider } from './transformation'

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <GeneralProvider>
      <TransformationProvider>{children}</TransformationProvider>
    </GeneralProvider>
  )
}
