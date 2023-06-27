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
        <C.IOList>
          <C.IOPlaceholder>
            <BsFillPencilFill size={20} />
            Output Attribute 1
          </C.IOPlaceholder>
          <C.IOPlaceholder>
            <BsFillPencilFill size={20} />
            Output Attribute 2
          </C.IOPlaceholder>

          <C.AddIOButton type="button" onClick={() => setOpen(true)}>
            +
          </C.AddIOButton>
        </C.IOList>
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
