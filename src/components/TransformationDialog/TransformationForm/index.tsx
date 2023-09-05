import useInput from '@/hooks/useInput'
import useTransformation from '@/hooks/useTransformation'
import {
  Input,
  InputChangeEvent,
  KeyboardEvent,
  MouseEvent,
} from '@/utils/types'
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
  name: string | undefined
}

export default function TransformationForm() {
  const [openInputDialog, setOpenInputDialog] = useState(false)
  const { selectedTransformation, updateTransformation } = useTransformation()
  const { createInput, deleteInput, setSelectedInput } = useInput()
  const [formData, setFormData] = useState<FormDataProps>({
    name: selectedTransformation?.name,
  })

  const handleChange = (e: InputChangeEvent) =>
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))

  const handleBlur = () => {
    if (selectedTransformation) {
      updateTransformation(selectedTransformation?.id, formData)
    }
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      const target = e.target as HTMLInputElement
      target.blur()
    }
  }

  const handleCreateInput = () => {
    if (selectedTransformation) {
      createInput(selectedTransformation.id)
    }
  }

  const handleDeleteInput = (e: MouseEvent, inputId: number) => {
    e.stopPropagation()

    if (selectedTransformation) {
      deleteInput(selectedTransformation.id, inputId)
    }
  }

  const handleEditInput = (input: Input) => {
    setSelectedInput(input)
    setOpenInputDialog(true)
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
              <C.InputItem
                key={input.id}
                onClick={() => handleEditInput(input)}
              >
                <BsFillPencilFill size={20} />
                <span className="w-full text-start">{input.name}</span>
                <C.DeleteInput onClick={(e) => handleDeleteInput(e, input.id)}>
                  <AiFillDelete size={'75%'} />
                </C.DeleteInput>
              </C.InputItem>
            ))
          )}
        </C.IOList>
      </C.DivGroup>

      <C.DivGroup>
        <C.Label>Output</C.Label>
        <C.IOList type="output">
          <OutputForm />
        </C.IOList>
      </C.DivGroup>

      {/* Dialogs */}
      <Dialog
        open={openInputDialog}
        onClose={() => setOpenInputDialog(false)}
        fullWidth={true}
        maxWidth={'md'}
      >
        <DialogTitle>Set input</DialogTitle>
        <DialogContent>
          <InputForm />
        </DialogContent>
      </Dialog>
    </C.Form>
  )
}
