import useInput from '@/hooks/useInput'
import useTransformation from '@/hooks/useTransformation'
import { InputChangeEvent, KeyboardEvent } from '@/utils/types'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { useState } from 'react'
import { BsFillPencilFill } from 'react-icons/bs'
import InputAttribute from './InputAttribute'
import * as C from './styles'

type FormDataProps = {
  name: string
}

export default function InputForm() {
  const [open, setOpen] = useState(false)
  const { selectedInput, updateInput } = useInput()
  const { selectedTransformation } = useTransformation()
  const [formData, setFormData] = useState<FormDataProps>({
    name: selectedInput?.name!,
  })

  const handleChange = (e: InputChangeEvent) =>
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))

  const handleBlur = () => {
    updateInput(selectedTransformation?.id!, selectedInput?.id!, formData)
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      const target = e.target as HTMLInputElement
      target.blur()
    }
  }

  return (
    <C.Form>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth={true}
        maxWidth={'xs'}
      >
        <DialogTitle>Set new input attribute</DialogTitle>
        <DialogContent>
          <InputAttribute />
        </DialogContent>
      </Dialog>

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
            Input Attribute 1
          </C.IOPlaceholder>
          <C.IOPlaceholder>
            <BsFillPencilFill size={20} />
            Input Attribute 2
          </C.IOPlaceholder>

          <C.AddIOButton type="button" onClick={() => setOpen(true)}>
            +
          </C.AddIOButton>
        </C.IOList>
      </C.InputGroup>
    </C.Form>
  )
}
