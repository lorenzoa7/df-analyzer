'use client'

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
  const defaultDataflowData: DataFlow = {
    dataflow_tag: '',
    code: '',
    transformations: [],
    tasks: [],
    codeLines: [],
  }
  const [dataflowData, setDataflowData] = useState(defaultDataflowData)
  const saveDataflowData = useCallback(() => {
    setLocalStorage(localStorageNames.dataflowData, dataflowData)
  }, [dataflowData])

  useEffect(() => {
    const data = getLocalStorage(
      localStorageNames.dataflowData,
    ) as DataFlow | null
    if (data) setDataflowData(data)
  }, [])

  useEffect(() => saveDataflowData(), [saveDataflowData])

  return (
    <AppContext.Provider
      value={{ dataflowData, setDataflowData, defaultDataflowData }}
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
