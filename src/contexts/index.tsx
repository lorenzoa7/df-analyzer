'use client'

import { AttributeProvider } from './attribute'
import { GeneralProvider } from './general'
import { InputProvider } from './input'
import { TransformationProvider } from './transformation'

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <GeneralProvider>
      <TransformationProvider>
        <InputProvider>
          <AttributeProvider>{children}</AttributeProvider>
        </InputProvider>
      </TransformationProvider>
    </GeneralProvider>
  )
}
