import { InputChangeEvent } from '@/utils/types'
import { MenuItem, Select, SelectChangeEvent } from '@mui/material'
import { useState } from 'react'
import * as C from './styles'

export default function InputAttribute() {
  const [type, setType] = useState('TEXT')
  const [name, setName] = useState('')

  const handleChangeType = (e: SelectChangeEvent): void => {
    setType(e.target.value)
  }

  const handleChangeName = (e: InputChangeEvent): void => {
    setName(e.target.value)
  }

  return (
    <C.Form>
      <C.InputGroup>
        <C.Label>Name</C.Label>
        <C.Input value={name} onChange={handleChangeName} />
      </C.InputGroup>
      <C.InputGroup>
        <C.Label>Type</C.Label>
        <Select value={type} onChange={handleChangeType}>
          <MenuItem value="TEXT">TEXT</MenuItem>
          <MenuItem value="NUMERIC">NUMERIC</MenuItem>
          <MenuItem value="FILE">FILE</MenuItem>
          <MenuItem value="RDFILE">RDFILE</MenuItem>
        </Select>
      </C.InputGroup>
    </C.Form>
  )
}
