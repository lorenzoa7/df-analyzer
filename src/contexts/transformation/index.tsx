import { Dispatch, SetStateAction, createContext, useState } from 'react'

export type TransformationContextProps = {
  openTransformationDialog: boolean
  setOpenTransformationDialog: Dispatch<SetStateAction<boolean>>
}

const TransformationContext = createContext<TransformationContextProps>(
  {} as TransformationContextProps,
)

const TransformationProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [openTransformationDialog, setOpenTransformationDialog] =
    useState(false)

  return (
    <TransformationContext.Provider
      value={{
        openTransformationDialog,
        setOpenTransformationDialog,
      }}
    >
      {children}
    </TransformationContext.Provider>
  )
}

export { TransformationContext, TransformationProvider }

