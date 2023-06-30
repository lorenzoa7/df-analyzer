import { findHighestId } from '@/functions'
import useTransformation from '@/hooks/useTransformation'
import { Input } from '@/utils/types'
import { Dispatch, SetStateAction, createContext, useState } from 'react'

export type InputContextProps = {
  selectedInput: Input | null
  setSelectedInput: Dispatch<SetStateAction<Input | null>>
  createInput: (id: number) => void
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

  return (
    <InputContext.Provider
      value={{
        selectedInput,
        setSelectedInput,
        createInput,
      }}
    >
      {children}
    </InputContext.Provider>
  )
}

export { InputContext, InputProvider }

