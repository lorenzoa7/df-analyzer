import useAttribute from '@/hooks/useAttribute'
import useGeneral from '@/hooks/useGeneral'
import useInput from '@/hooks/useInput'
import useTransformation from '@/hooks/useTransformation'
import {
  Attribute,
  InputChangeEvent,
  KeyboardEvent,
  MouseEvent,
  Output,
  Reference,
  Transformation,
} from '@/utils/types'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { useState } from 'react'
import { AiFillDelete } from 'react-icons/ai'
import { BsFillPencilFill } from 'react-icons/bs'
import InputReferenceList from './InputReferenceList'
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
  const [openInputReferenceDialog, setOpenInputReferenceDialog] =
    useState(false)
  const [transformationReference, setTransformationReference] =
    useState<Transformation | null>(null)
  const { appData } = useGeneral()
  const { getInputById } = useInput()
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

  const handleRemoveInputReference = () => {
    const editedOutput: Output = {
      ...selectedTransformation!.output,
      reference: null,
    }
    updateTransformation(selectedTransformation!.id, { output: editedOutput })
    setInputReference(null)
  }

  const handleOpenInputReferenceDialog = (transformation: Transformation) => {
    if (transformation.inputs.length > 0) {
      const newReference: Reference = {
        transformationId: transformation.id,
        inputId: transformation.inputs[0].id,
      }
      const editedOutput: Output = {
        ...selectedTransformation!.output,
        reference: newReference,
      }
      updateTransformation(selectedTransformation!.id, { output: editedOutput })
      setInputReference(newReference)
    }

    setTransformationReference(transformation)
    setOpenInputReferenceDialog(true)
  }

  return (
    <C.Container>
      <C.Form>
        {/* Forms */}

        {inputReference && (
          <>
            <C.InputGroup $preview>
              <C.Label>Name</C.Label>
              <C.Input
                name="name"
                value={
                  getInputById(
                    inputReference.transformationId,
                    inputReference.inputId,
                  )?.name
                }
                type="text"
                readOnly
              />
            </C.InputGroup>

            <C.InputGroup>
              <C.Label>Attributes</C.Label>
              <C.OutputAttributeList>
                {getInputById(
                  inputReference.transformationId,
                  inputReference.inputId,
                )?.attributes.length === 0 ? (
                  <C.EmptyLabel>{`No attributes in
                  "${
                    getInputById(
                      inputReference.transformationId,
                      inputReference.inputId,
                    )?.name
                  }" input`}</C.EmptyLabel>
                ) : (
                  getInputById(
                    inputReference.transformationId,
                    inputReference.inputId,
                  )?.attributes.map((attribute) => (
                    <C.OutputAttribute $preview key={attribute.id}>
                      <span className="w-full text-start">
                        {attribute.name}
                      </span>
                    </C.OutputAttribute>
                  ))
                )}
              </C.OutputAttributeList>
            </C.InputGroup>
          </>
        )}

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
            onClick={handleRemoveInputReference}
            $selected={inputReference === null}
          >
            <span className="w-full text-start">No output reference</span>
          </C.TransformationItem>
        )}
        {appData.transformations.map((transformation) =>
          transformation.id === selectedTransformation?.id ? null : (
            <C.TransformationItem
              key={transformation.id}
              onClick={() => handleOpenInputReferenceDialog(transformation)}
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

      <Dialog
        open={openInputReferenceDialog}
        onClose={() => setOpenInputReferenceDialog(false)}
        fullWidth={true}
        maxWidth={'xs'}
      >
        <DialogTitle>Choose input reference</DialogTitle>
        <DialogContent>
          <InputReferenceList
            id={transformationReference?.id}
            name={transformationReference?.name}
            inputs={transformationReference?.inputs}
            setInputReference={setInputReference}
          />
        </DialogContent>
      </Dialog>
    </C.Container>
  )
}
