import useTransformation from '@/hooks/useTransformation'
import { Output, Reference, Transformation } from '@/utils/types'
import { SetStateAction, useState } from 'react'
import * as C from './styles'

type InputReferenceListProps = Partial<Transformation> & {
  inputReference: Reference | null
  setInputReference: React.Dispatch<SetStateAction<Reference | null>>
}

export default function InputReferenceList({
  id = -1,
  name = '',
  inputs = [],
  inputReference,
  setInputReference,
}: InputReferenceListProps) {
  const { updateTransformation, selectedTransformation } = useTransformation()

  const [selectedId, setSelectedId] = useState(
    inputReference ? inputReference.inputId : null,
  )

  const handleSelectInput = (inputId: number) => {
    const newReference: Reference = {
      transformationId: id,
      inputId: inputId,
    }
    const editedOutput: Output = {
      ...selectedTransformation!.output,
      reference: newReference,
    }

    updateTransformation(selectedTransformation!.id, { output: editedOutput })
    setSelectedId(inputId)
    setInputReference(newReference)
  }

  return (
    <C.Container>
      <C.Label>Inputs of Transformation: {name}</C.Label>
      <C.InputsList>
        {inputs.length === 0 ? (
          <C.EmptyLabel>{`There's no inputs in this transformation`}</C.EmptyLabel>
        ) : (
          inputs.map((input) => (
            <C.InputItem
              key={input.id}
              onClick={() => handleSelectInput(input.id)}
              $selected={selectedId === input.id}
            >
              <span className="w-full text-start">{input.name}</span>
            </C.InputItem>
          ))
        )}
      </C.InputsList>
    </C.Container>
  )
}
