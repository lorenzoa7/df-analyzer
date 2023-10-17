'use client'

import { defaultDataflowData } from '@/config/defaults'
import { localStorageNames } from '@/config/storage'
import { getLocalStorage } from '@/functions/get-local-storage'
import { setLocalStorage } from '@/functions/set-local-storage'

import { DataFlow } from '@/lib/types'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'

export type Props = {
  dataflowData: DataFlow
  setDataflowData: React.Dispatch<React.SetStateAction<DataFlow>>
  defaultDataflowData: DataFlow
}

const AppContext = createContext<Props>({} as Props)

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [dataflowData, setDataflowData] = useState<DataFlow>(() => {
    if (typeof window !== 'undefined') {
      const localDataflowData = getLocalStorage(localStorageNames.dataflowData)
      if (localDataflowData) {
        return localDataflowData as DataFlow
      }
    }
    return defaultDataflowData
  })

  const saveDataflowData = useCallback(() => {
    setLocalStorage(localStorageNames.dataflowData, dataflowData)
  }, [dataflowData])

  useEffect(() => saveDataflowData(), [saveDataflowData])

  return (
    <AppContext.Provider
      value={{
        dataflowData,
        setDataflowData,
        defaultDataflowData,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

const useApp = () => {
  const context = useContext(AppContext)

  return context
}

export { AppProvider, useApp }
