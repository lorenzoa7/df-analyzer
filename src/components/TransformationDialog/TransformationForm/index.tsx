import useInput from '@/hooks/useInput'
import useTransformation from '@/hooks/useTransformation'
import { InputChangeEvent, KeyboardEvent } from '@/utils/types'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { useState } from 'react'
import { AiFillDelete } from 'react-icons/ai'
import { BsFillPencilFill } from 'react-icons/bs'
import InputForm from './InputForm'
import OutputForm from './OutputForm'
import * as C from './styles'

type FormDataProps = {
  name: string
}

export default function TransformationForm() {
  const [openInput, setOpenInput] = useState(false)
  const { selectedTransformation, updateTransformation } = useTransformation()
  const { createInput } = useInput()
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

  const handleCreateInput = () => {
    createInput(selectedTransformation!.id)
  }

  return (
    <C.Form>
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
          <C.AddButtonContainer>
            <C.AddIOButton type="button" onClick={handleCreateInput}>
              +
            </C.AddIOButton>
          </C.AddButtonContainer>
          {selectedTransformation?.inputs.length === 0 ? (
            <C.EmptyLabel>Create new inputs</C.EmptyLabel>
          ) : (
            selectedTransformation?.inputs.map((input) => (
              <C.InputItem key={input.id}>
                <BsFillPencilFill size={20} />
                <span className="w-full text-start">{input.name}</span>
                <C.DeleteInput onClick={() => null}>
                  <AiFillDelete size={'75%'} />
                </C.DeleteInput>
              </C.InputItem>
            ))
          )}
        </C.IOList>
      </C.DivGroup>

      <C.DivGroup>
        <C.Label>Outputs</C.Label>
        <C.IOList type="output">
          <OutputForm />
        </C.IOList>
      </C.DivGroup>

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
    </C.Form>
  )
}
