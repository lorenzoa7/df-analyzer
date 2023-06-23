'use client'

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
    localStorage.getItem('appData')
      ? JSON.parse(localStorage.getItem('appData')!)
      : defaultAppData,
  )

  const saveAppData = useCallback(() => {
    const jsonAppData = JSON.stringify(appData)

    localStorage.setItem('appData', jsonAppData)
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

