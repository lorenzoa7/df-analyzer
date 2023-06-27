import useAttribute from '@/hooks/useAttribute'
import useTransformation from '@/hooks/useTransformation'
import { InputChangeEvent, KeyboardEvent, Output } from '@/utils/types'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { useState } from 'react'
import { BsFillPencilFill } from 'react-icons/bs'
import OutputAttribute from './OutputAttribute'
import * as C from './styles'

type FormDataProps = {
  name: string
}

export default function OutputForm() {
  const { updateTransformation, selectedTransformation } = useTransformation()
  const { createOutputAttribute } = useAttribute()
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
                {attribute.name}
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
