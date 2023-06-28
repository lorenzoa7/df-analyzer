import useAttribute from '@/hooks/useAttribute'
import useTransformation from '@/hooks/useTransformation'
import {
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
  const { createOutputAttribute, deleteOutputAttribute } = useAttribute()
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState<FormDataProps>({
    name: selectedTransformation?.output.name!,
  })

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
          {selectedTransformation?.output.attributes.length === 0 ? (
            <C.EmptyLabel>Create new attributes</C.EmptyLabel>
          ) : (
            selectedTransformation?.output.attributes.map((attribute) => (
              <C.OutputAttribute key={attribute.id}>
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

          <C.AddAttributeButton type="button" onClick={handleCreateAttribute}>
            +
          </C.AddAttributeButton>
        </C.OutputAttributeList>
      </C.InputGroup>

      {/* Dialogs */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth={true}
        maxWidth={'xs'}
      >
        <DialogTitle>Set new output attribute</DialogTitle>
        <DialogContent>
          <OutputAttribute />
        </DialogContent>
      </Dialog>
    </C.Form>
  )
}
