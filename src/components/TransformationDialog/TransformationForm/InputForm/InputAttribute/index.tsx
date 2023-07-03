import useAttribute from '@/hooks/useAttribute'
import useInput from '@/hooks/useInput'
import useTransformation from '@/hooks/useTransformation'
import { AttributeType, InputChangeEvent, KeyboardEvent } from '@/utils/types'
import { MenuItem, Select, SelectChangeEvent } from '@mui/material'
import { useState } from 'react'
import * as C from './styles'

type FormDataProps = {
  type: AttributeType
  name: string
}

export default function InputAttribute() {
  const { selectedAttribute, updateInputAttribute } = useAttribute()
  const { selectedTransformation } = useTransformation()
  const { selectedInput } = useInput()
  const [formData, setFormData] = useState<FormDataProps>({
    type: selectedAttribute?.type!,
    name: selectedAttribute?.name!,
  })

  const handleChange = (e: SelectChangeEvent | InputChangeEvent) => {
    setFormData((prevState) => {
      const updatedFormData = {
        ...prevState,
        [e.target.name]: e.target.value,
      }

      if (e.target.name === 'type') {
        updateInputAttribute({
          transformationId: selectedTransformation?.id!,
          input: selectedInput!,
          attributeId: selectedAttribute?.id!,
          updatedFields: updatedFormData,
        })
      }

      return updatedFormData
    })
  }

  const handleBlur = () => {
    updateInputAttribute({
      transformationId: selectedTransformation?.id!,
      input: selectedInput!,
      attributeId: selectedAttribute?.id!,
      updatedFields: formData,
    })
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      const target = e.target as HTMLInputElement
      target.blur()
    }
  }

  return (
    <C.Form>
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
        <C.Label>Type</C.Label>
        <Select name="type" value={formData.type} onChange={handleChange}>
          <MenuItem value="TEXT">TEXT</MenuItem>
          <MenuItem value="NUMERIC">NUMERIC</MenuItem>
          <MenuItem value="FILE">FILE</MenuItem>
          <MenuItem value="RDFILE">RDFILE</MenuItem>
        </Select>
      </C.InputGroup>
    </C.Form>
  )
}
