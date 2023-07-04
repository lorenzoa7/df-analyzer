import useAttribute from '@/hooks/useAttribute'
import useInput from '@/hooks/useInput'
import useTransformation from '@/hooks/useTransformation'
import {
  Attribute,
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
import InputAttribute from './InputAttribute'
import * as C from './styles'

type FormDataProps = {
  name: string
}

export default function InputForm() {
  const [openAttributeDialog, setOpenAttributeDialog] = useState(false)
  const { selectedInput, updateInput } = useInput()
  const { setSelectedAttribute, createInputAttribute, deleteInputAttribute } =
    useAttribute()
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

  const handleCreateAttribute = () => {
    createInputAttribute(selectedTransformation!.id, selectedInput!)
  }

  const handleDeleteAttribute = (e: MouseEvent, attributeId: number) => {
    e.stopPropagation()

    deleteInputAttribute(
      selectedTransformation!.id,
      selectedInput!,
      attributeId,
    )
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
        <C.InputAttributeList>
          <>
            <C.AddButtonContainer>
              <C.AddAttributeButton
                type="button"
                onClick={handleCreateAttribute}
              >
                +
              </C.AddAttributeButton>
            </C.AddButtonContainer>

            {selectedInput?.attributes.length === 0 ? (
              <C.EmptyLabel>Create new attributes</C.EmptyLabel>
            ) : (
              selectedInput?.attributes.map((attribute) => (
                <C.InputAttribute
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
                </C.InputAttribute>
              ))
            )}
          </>
        </C.InputAttributeList>
      </C.InputGroup>
      {/* Dialogs */}
      <Dialog
        open={openAttributeDialog}
        onClose={() => setOpenAttributeDialog(false)}
        fullWidth={true}
        maxWidth={'xs'}
      >
        <DialogTitle>Set input attribute</DialogTitle>
        <DialogContent>
          <InputAttribute />
        </DialogContent>
      </Dialog>
    </C.Form>
  )
}
