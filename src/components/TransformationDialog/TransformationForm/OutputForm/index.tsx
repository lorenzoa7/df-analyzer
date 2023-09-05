import useAttribute from '@/hooks/useAttribute'
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
  name: string | undefined
}

export default function OutputForm() {
  const { updateTransformation, selectedTransformation } = useTransformation()
  const { createOutputAttribute, deleteOutputAttribute, setSelectedAttribute } =
    useAttribute()
  const [openAttributeDialog, setOpenAttributeDialog] = useState(false)
  const [formData, setFormData] = useState<FormDataProps>({
    name: selectedTransformation?.output.name,
  })

  const handleChange = (e: InputChangeEvent) =>
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))

  const handleBlur = () => {
    if (selectedTransformation && formData.name) {
      const editedOutput: Output = {
        ...selectedTransformation.output,
        name: formData.name,
      }
      updateTransformation(selectedTransformation.id, { output: editedOutput })
    }
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      const target = e.target as HTMLInputElement
      target.blur()
    }
  }

  const handleCreateAttribute = () => {
    if (selectedTransformation) {
      createOutputAttribute(selectedTransformation.id)
    }
  }

  const handleDeleteAttribute = (e: MouseEvent, attributeId: number) => {
    e.stopPropagation()

    if (selectedTransformation) {
      deleteOutputAttribute(selectedTransformation.id, attributeId)
    }
  }

  const handleEditAttribute = (attribute: Attribute) => {
    setSelectedAttribute(attribute)
    setOpenAttributeDialog(true)
  }

  return (
    <C.Form>
      {/* Forms */}
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
            <C.AddAttributeButton type="button" onClick={handleCreateAttribute}>
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
                <span className="w-full text-start">{attribute.name}</span>
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
    </C.Form>
  )
}
