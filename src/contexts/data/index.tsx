'use client'

import { getLocalStorage, setLocalStorage } from '@/functions'
import { DataFlow } from '@/utils/types'
import {
  Dispatch,
  SetStateAction,
  createContext,
  useCallback,
  useEffect,
  useState,
} from 'react'

export type DataContextProps = {
  openTransformationDialog: boolean
  setOpenTransformationDialog: Dispatch<SetStateAction<boolean>>
  appData: DataFlow
  setAppData: Dispatch<SetStateAction<DataFlow>>
  defaultAppData: DataFlow
  saveAppData: () => void
}

const DataContext = createContext<DataContextProps>({} as DataContextProps)

const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const [openTransformationDialog, setOpenTransformationDialog] =
    useState(false)

  const defaultAppData: DataFlow = {
    dataflow_tag: '',
    code: '',
    transformations: [],
  }

  const [appData, setAppData] = useState(
    getLocalStorage('app_data') ? getLocalStorage('app_data') : defaultAppData,
  )

  const saveAppData = useCallback(() => {
    setLocalStorage('app_data', appData)
  }, [appData])

  useEffect(() => saveAppData(), [saveAppData])

  return (
    <DataContext.Provider
      value={{
        openTransformationDialog,
        setOpenTransformationDialog,
        appData,
        setAppData,
        defaultAppData,
        saveAppData,
      }}
    >
      {children}
    </DataContext.Provider>
  )
}

export { DataContext, DataProvider }

