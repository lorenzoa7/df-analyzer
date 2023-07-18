'use client'

import useGeneral from '@/hooks/useGeneral'
import { InputChangeEvent, KeyboardEvent } from '@/utils/types'
import { useState } from 'react'
import * as C from './styles'

export default function HeaderSection() {
  const { appData, setAppData } = useGeneral()
  const [formData, setFormData] = useState({
    dataflow_tag: appData.dataflow_tag,
  })

  const handleChange = (e: InputChangeEvent) =>
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))

  const handleBlur = () => {
    setAppData((prevState) => ({
      ...prevState,
      dataflow_tag: formData.dataflow_tag,
    }))
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      const target = e.target as HTMLInputElement
      target.blur()
    }
  }

  return (
    <>
      <C.TitleLabel>DataFlow Tag</C.TitleLabel>
      <C.DataflowTagInput
        name="dataflow_tag"
        value={formData.dataflow_tag}
        type="text"
        onChange={handleChange}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
      />
    </>
  )
}
