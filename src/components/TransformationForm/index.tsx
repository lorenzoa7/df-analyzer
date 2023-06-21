import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { useState } from 'react'
import { BsFillPencilFill } from 'react-icons/bs'
import InputForm from './InputForm'
import OutputForm from './OutputForm'
import * as C from './styles'

export default function TransformationForm() {
  const [openInput, setOpenInput] = useState<boolean>(false)
  const [openOutput, setOpenOutput] = useState<boolean>(false)

  return (
    <C.Form>
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

      <C.InputGroup>
        <C.Label>Name</C.Label>
        <C.Input type="text" />
      </C.InputGroup>
      <C.InputGroup>
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
      </C.InputGroup>

      <C.InputGroup>
        <C.Label>Outputs</C.Label>
        <C.IOList type="output">
          <OutputForm />
        </C.IOList>
      </C.InputGroup>
    </C.Form>
  )
}
