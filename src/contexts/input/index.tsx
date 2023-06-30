import { findHighestId } from '@/functions'
import useTransformation from '@/hooks/useTransformation'
import { Input } from '@/utils/types'
import { Dispatch, SetStateAction, createContext, useState } from 'react'

export type InputContextProps = {
  selectedInput: Input | null
  setSelectedInput: Dispatch<SetStateAction<Input | null>>
  createInput: (id: number) => void
  deleteInput: (tranformationId: number, attributeId: number) => void
}

const InputContext = createContext<InputContextProps>({} as InputContextProps)

const InputProvider = ({ children }: { children: React.ReactNode }) => {
  const { updateTransformation, getTransformationById } = useTransformation()
  const [selectedInput, setSelectedInput] = useState<Input | null>(null)

  const createInput = (id: number): void => {
    const transformation = getTransformationById(id)
    if (transformation) {
      const inputList = transformation.inputs
      const newInput: Input = {
        id: findHighestId(inputList) + 1,
        name: 'New Input',
        attributes: [],
      }

      const editedInputs = inputList.concat(newInput)

      updateTransformation(id, { inputs: editedInputs })
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
        createInput,
        deleteInput,
      }}
    >
      {children}
    </InputContext.Provider>
  )
}

export { InputContext, InputProvider }

