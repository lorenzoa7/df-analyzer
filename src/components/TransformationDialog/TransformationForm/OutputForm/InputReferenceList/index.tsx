import useTransformation from '@/hooks/useTransformation'
import { Output, Reference, Transformation } from '@/utils/types'
import { useState } from 'react'
import * as C from './styles'

export default function InputReferenceList({
  id = -1,
  name = '',
  inputs = [],
}: Partial<Transformation>) {
  const { updateTransformation, selectedTransformation } = useTransformation()

  const [selectedId, setSelectedId] = useState(
    inputs.length > 0 ? inputs[0].id : null,
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
