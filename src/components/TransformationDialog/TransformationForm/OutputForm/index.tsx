import useAttribute from '@/hooks/useAttribute'
import useGeneral from '@/hooks/useGeneral'
import useTransformation from '@/hooks/useTransformation'
import {
  Attribute,
  InputChangeEvent,
  KeyboardEvent,
  MouseEvent,
  Output,
} from '@/utils/types'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { useState } from 'react'
import { AiFillDelete } from 'react-icons/ai'
import { BsFillPencilFill } from 'react-icons/bs'
import OutputAttribute from './OutputAttribute'
import * as C from './styles'

type FormDataProps = {
  name: string
}

export default function OutputForm() {
  const { updateTransformation, selectedTransformation } = useTransformation()
  const { createOutputAttribute, deleteOutputAttribute, setSelectedAttribute } =
    useAttribute()
  const [openAttributeDialog, setOpenAttributeDialog] = useState(false)
  const { appData } = useGeneral()
  const [formData, setFormData] = useState<FormDataProps>({
    name: selectedTransformation?.output.name!,
  })
  const [inputReference, setInputReference] = useState(
    selectedTransformation?.output.reference,
  )

  const handleChange = (e: InputChangeEvent) =>
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))

  const handleBlur = () => {
    const editedOutput: Output = {
      ...selectedTransformation!.output,
      ...formData,
    }
    updateTransformation(selectedTransformation!.id, { output: editedOutput })
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      const target = e.target as HTMLInputElement
      target.blur()
    }
  }

  const handleCreateAttribute = () => {
    createOutputAttribute(selectedTransformation!.id)
  }

  const handleDeleteAttribute = (e: MouseEvent, attributeId: number) => {
    e.stopPropagation()

    deleteOutputAttribute(selectedTransformation!.id, attributeId)
  }

  const handleEditAttribute = (attribute: Attribute) => {
    setSelectedAttribute(attribute)
    setOpenAttributeDialog(true)
  }

  const handleSetInputReference = (transformationId: number) => {
    // setOutputReference(transformationId)
    // const newReference =
    //   transformationId === selectedTransformation!.id ? null : transformationId
    // updateInput(selectedTransformation?.id!, selectedInput?.id!, {
    //   transformationOutputReferenceId: newReference,
    // })
  }

  return (
    <C.Container>
      <C.Form>
        {/* Forms */}

        {inputReference && <p>Ok</p>}

        {!inputReference && (
          <>
            <C.InputGroup>
              <C.Label>Name</C.Label>
              <C.Input
                name="name"
                value={formData.name}
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
              />
            </C.InputGroup>

            <C.InputGroup>
              <C.Label>Attributes</C.Label>
              <C.OutputAttributeList>
                <C.AddButtonContainer>
                  <C.AddAttributeButton
                    type="button"
                    onClick={handleCreateAttribute}
                  >
                    +
                  </C.AddAttributeButton>
                </C.AddButtonContainer>
                {selectedTransformation?.output.attributes.length === 0 ? (
                  <C.EmptyLabel>Create new attributes</C.EmptyLabel>
                ) : (
                  selectedTransformation?.output.attributes.map((attribute) => (
                    <C.OutputAttribute
                      key={attribute.id}
                      onClick={() => handleEditAttribute(attribute)}
                    >
                      <BsFillPencilFill size={20} />
                      <span className="w-full text-start">
                        {attribute.name}
                      </span>
                      <C.DeleteAttribute
                        onClick={(e) => handleDeleteAttribute(e, attribute.id)}
                      >
                        <AiFillDelete size={'75%'} />
                      </C.DeleteAttribute>
                    </C.OutputAttribute>
                  ))
                )}
              </C.OutputAttributeList>
            </C.InputGroup>
          </>
        )}
      </C.Form>

      {/* List of Transformations */}

      <C.TransformationListContainer>
        <span className="text-center font-medium">
          Set output as another transformation input
        </span>
        {selectedTransformation && (
          <C.TransformationItem
            key={selectedTransformation.id}
            onClick={() => handleSetInputReference(selectedTransformation.id)}
            $selected={inputReference === null}
          >
            <span className="w-full text-start">No output reference</span>
          </C.TransformationItem>
        )}
        {appData.transformations.map((transformation) =>
          transformation.id === selectedTransformation?.id ? null : (
            <C.TransformationItem
              key={transformation.id}
              onClick={() => handleSetInputReference(transformation.id)}
              $selected={inputReference?.transformationId === transformation.id}
            >
              <span className="w-full text-start">{transformation.name}</span>
            </C.TransformationItem>
          ),
        )}
      </C.TransformationListContainer>

      {/* Dialogs */}
      <Dialog
        open={openAttributeDialog}
        onClose={() => setOpenAttributeDialog(false)}
        fullWidth={true}
        maxWidth={'xs'}
      >
        <DialogTitle>Set output attribute</DialogTitle>
        <DialogContent>
          <OutputAttribute />
        </DialogContent>
      </Dialog>
    </C.Container>
  )
}
