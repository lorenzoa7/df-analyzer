'use client'

import { AttributeProvider } from './attribute'
import { GeneralProvider } from './general'
import { InputProvider } from './input'
import { TaskProvider } from './task'
import { TransformationProvider } from './transformation'

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <GeneralProvider>
      <TransformationProvider>
        <TaskProvider>
          <InputProvider>
            <AttributeProvider>{children}</AttributeProvider>
          </InputProvider>
        </TaskProvider>
      </TransformationProvider>
    </GeneralProvider>
  )
}
