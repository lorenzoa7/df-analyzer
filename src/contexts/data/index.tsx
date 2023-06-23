'use client'

import { Dispatch, SetStateAction, createContext, useState } from 'react'

export type DataContextProps = {
  openTransformationDialog: boolean
  setOpenTransformationDialog: Dispatch<SetStateAction<boolean>>
  code: string
  setCode: Dispatch<SetStateAction<string>>
}

const DataContext = createContext<DataContextProps>({} as DataContextProps)

const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const [openTransformationDialog, setOpenTransformationDialog] =
    useState(false)
  const [code, setCode] = useState('')

  return (
    <DataContext.Provider
      value={{
        openTransformationDialog,
        setOpenTransformationDialog,
        code,
        setCode,
      }}
    >
      {children}
    </DataContext.Provider>
  )
}

export { DataContext, DataProvider }

