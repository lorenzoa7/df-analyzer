import { findHighestId } from '@/functions'
import useGeneral from '@/hooks/useGeneral'
import useTransformation from '@/hooks/useTransformation'
import { Input } from '@/utils/types'
import { Dispatch, SetStateAction, createContext, useState } from 'react'

export type InputContextProps = {
  selectedInput: Input | null
  setSelectedInput: Dispatch<SetStateAction<Input | null>>
  getInputById: (transformationId: number, inputId: number) => Input | undefined
  createInput: (id: number) => void
  updateInput: (
    transformationId: number,
    inputId: number,
    updatedFields: Partial<Input>,
  ) => void
  deleteInput: (tranformationId: number, attributeId: number) => void
}

const InputContext = createContext<InputContextProps>({} as InputContextProps)

const InputProvider = ({ children }: { children: React.ReactNode }) => {
  const { updateTransformation, getTransformationById } = useTransformation()
  const { appData } = useGeneral()
  const [selectedInput, setSelectedInput] = useState<Input | null>(null)

  const getInputById = (
    transformationId: number,
    inputId: number,
  ): Input | undefined => {
    const transformation = getTransformationById(transformationId)
    if (transformation) {
      return transformation.inputs.find((input) => input.id === inputId)
    }
  }

  const createInput = (id: number): void => {
    const transformation = getTransformationById(id)
    if (transformation) {
      const inputList = transformation.inputs
      const newInput: Input = {
        id: findHighestId(inputList) + 1,
        name: 'New Input',
        attributes: [],
        transformationOutputReferenceId: null,
      }

      const editedInputs = inputList.concat(newInput)

      updateTransformation(id, { inputs: editedInputs })
    }
  }

  const updateInput = (
    transformationId: number,
    inputId: number,
    updatedFields: Partial<Input>,
  ): void => {
    const transformation = getTransformationById(transformationId)
    if (transformation) {
      const editedInputs = transformation.inputs.map((input) => {
        if (input.id === inputId) {
          return {
            ...input,
            ...updatedFields,
          }
        }
        return input
      })

      updateTransformation(transformationId, { inputs: editedInputs })
    }
  }

  const deleteInput = (transformationId: number, inputId: number) => {
    const transformation = getTransformationById(transformationId)
    if (transformation) {
      const inputList = transformation.inputs
      const editedInputs = inputList.filter((input) => input.id !== inputId)

      updateTransformation(transformationId, { inputs: editedInputs })
    }
  }

  return (
    <InputContext.Provider
      value={{
        selectedInput,
        setSelectedInput,
        getInputById,
        createInput,
        updateInput,
        deleteInput,
      }}
    >
      {children}
    </InputContext.Provider>
  )
}

export { InputContext, InputProvider }
