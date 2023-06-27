'use client'

import { AttributeProvider } from './attribute'
import { GeneralProvider } from './general'
import { TransformationProvider } from './transformation'

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <GeneralProvider>
      <TransformationProvider>
        <AttributeProvider>{children}</AttributeProvider>
      </TransformationProvider>
    </GeneralProvider>
  )
}
