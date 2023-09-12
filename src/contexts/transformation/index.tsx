import useGeneral from '@/hooks/useGeneral'
import { Transformation } from '@/utils/types'
import { Dispatch, SetStateAction, createContext, useState } from 'react'

export type TransformationContextProps = {
  openTransformationDialog: boolean
  setOpenTransformationDialog: Dispatch<SetStateAction<boolean>>
  selectedTransformation: Transformation | null
  setSelectedTransformation: Dispatch<SetStateAction<Transformation | null>>
  getTransformationById: (id: number) => Transformation | undefined
  updateTransformation: (
    id: number,
    updatedFields: Partial<Transformation>,
  ) => void
  getNumberOfOutputAttributes: (transformationId: number) => number
}

const TransformationContext = createContext<TransformationContextProps>(
  {} as TransformationContextProps,
)

const TransformationProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const { appData, setAppData } = useGeneral()

  const [openTransformationDialog, setOpenTransformationDialog] =
    useState(false)

  const [selectedTransformation, setSelectedTransformation] =
    useState<Transformation | null>(null)

  const getTransformationById = (id: number): Transformation | undefined => {
    return appData.transformations.find(
      (transformation) => transformation.id === id,
    )
  }

  const updateTransformation = (
    id: number,
    updatedFields: Partial<Transformation>,
  ): void => {
    setAppData((prevData) => {
      const updatedTransformations = prevData.transformations.map(
        (transformation) => {
          if (transformation.id === id) {
            return { ...transformation, ...updatedFields }
          }
          return transformation
        },
      )

      return { ...prevData, transformations: updatedTransformations }
    })

    setSelectedTransformation((prevSelectedTransformation) => {
      if (prevSelectedTransformation && prevSelectedTransformation.id === id) {
        return { ...prevSelectedTransformation, ...updatedFields }
      }
      return prevSelectedTransformation
    })
  }

  const getNumberOfOutputAttributes = (transformationId: number) => {
    const transformation = getTransformationById(transformationId)
    if (transformation) return transformation?.output.attributes.length

    return 0
  }

  return (
    <TransformationContext.Provider
      value={{
        openTransformationDialog,
        setOpenTransformationDialog,
        selectedTransformation,
        setSelectedTransformation,
        getTransformationById,
        updateTransformation,
        getNumberOfOutputAttributes,
      }}
    >
      {children}
    </TransformationContext.Provider>
  )
}

export { TransformationContext, TransformationProvider }
