'use client'

import { createContext, useContext, useEffect, useState } from 'react'

const IsClientContext = createContext(false)

const IsClientProvider = ({ children }: { children: React.ReactNode }) => {
  const [isClient, setIsClient] = useState(false)
  useEffect(() => setIsClient(true), [])
  return (
    <IsClientContext.Provider value={isClient}>
      {children}
    </IsClientContext.Provider>
  )
}

const useIsClient = () => {
  const context = useContext(IsClientContext)

  return context
}

export { IsClientProvider, useIsClient }
