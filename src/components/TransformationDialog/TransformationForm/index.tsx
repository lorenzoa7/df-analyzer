import useGeneral from '@/hooks/useGeneral'
import useTransformation from '@/hooks/useTransformation'
import { InputChangeEvent, KeyboardEvent } from '@/utils/types'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { useState } from 'react'
import { BsFillPencilFill } from 'react-icons/bs'
import InputForm from './InputForm'
import OutputForm from './OutputForm'
import * as C from './styles'

type FormDataProps = {
  name: string
}

export default function TransformationForm() {
  const [openInput, setOpenInput] = useState(false)
  const [openOutput, setOpenOutput] = useState(false)
  const { selectedTransformation, updateTransformation } = useTransformation()
  const { setAppData } = useGeneral()
  const [formData, setFormData] = useState<FormDataProps>({
    name: selectedTransformation?.name!,
  })

  const handleChange = (e: InputChangeEvent) =>
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))

  const handleBlur = () => {
    updateTransformation(selectedTransformation?.id!, formData)
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      const target = e.target as HTMLInputElement
      target.blur()
    }
  }

  return (
    <C.Form>
      {/* Dialogs */}
      <Dialog
        open={openInput}
        onClose={() => setOpenInput(false)}
        fullWidth={true}
        maxWidth={'md'}
      >
        <DialogTitle>Set new input</DialogTitle>
        <DialogContent>
          <InputForm />
        </DialogContent>
      </Dialog>

      <Dialog
        open={openOutput}
        onClose={() => setOpenOutput(false)}
        fullWidth={true}
        maxWidth={'md'}
      >
        <DialogTitle>Set new output</DialogTitle>
        <DialogContent>
          <OutputForm />
        </DialogContent>
      </Dialog>

      {/* Forms */}
      <C.DivGroup>
        <C.Label>Name</C.Label>
        <C.Input
          name="name"
          value={formData.name}
          type="text"
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
        />
      </C.DivGroup>
      <C.DivGroup>
        <C.Label>Inputs</C.Label>
        <C.IOList>
          <C.IOPlaceholder>
            <BsFillPencilFill size={20} />
            Input 1
          </C.IOPlaceholder>
          <C.IOPlaceholder>
            <BsFillPencilFill size={20} />
            Input 1
          </C.IOPlaceholder>

          <C.AddIOButton type="button" onClick={() => setOpenInput(true)}>
            +
          </C.AddIOButton>
        </C.IOList>
      </C.DivGroup>

      <C.DivGroup>
        <C.Label>Outputs</C.Label>
        <C.IOList type="output">
          <OutputForm />
        </C.IOList>
      </C.DivGroup>
    </C.Form>
  )
}
