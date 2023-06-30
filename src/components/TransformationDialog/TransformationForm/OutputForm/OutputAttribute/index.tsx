import useAttribute from '@/hooks/useAttribute'
import { InputChangeEvent, KeyboardEvent } from '@/utils/types'
import { MenuItem, Select, SelectChangeEvent } from '@mui/material'
import { useState } from 'react'
import * as C from './styles'

type FormDataProps = {
  type: string
  name: string
}

export default function OutputAttribute() {
  const [type, setType] = useState('TEXT')
  const [name, setName] = useState<string>('')
  const { selectedAttribute } = useAttribute()
  const [formData, setFormData] = useState<FormDataProps>({
    type: selectedAttribute?.type!,
    name: selectedAttribute?.name!,
  })

  const handleChange = (e: SelectChangeEvent | InputChangeEvent) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
    if (e.target.name === 'type') console.log('type')
  }

  const handleBlur = () => {
    console.log('name')
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
