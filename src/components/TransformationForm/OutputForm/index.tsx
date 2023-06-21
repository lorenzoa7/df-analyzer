import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { useState } from 'react'
import { BsFillPencilFill } from 'react-icons/bs'
import OutputAttribute from './OutputAttribute'
import * as C from './styles'

export default function OutputForm() {
  const [open, setOpen] = useState<boolean>(false)

  return (
    <C.Form>
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

      <C.InputGroup>
        <C.Label>Name</C.Label>
        <C.Input type="text" />
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
    </C.Form>
  )
}
