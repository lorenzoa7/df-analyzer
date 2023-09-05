'use client'

import useGeneral from '@/hooks/useGeneral'
import { TextareaChangeEvent } from '@/utils/types'
import { useState } from 'react'
import * as C from './styles'

export default function CodeSection() {
  const { appData, setAppData } = useGeneral()
  const [formData, setFormData] = useState({
    code: appData.code,
  })

  const handleChange = (e: TextareaChangeEvent) =>
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))

  const handleBlur = () => {
    setAppData((prevState) => ({
      ...prevState,
      code: formData.code,
    }))
  }

  const handleKeyDown: React.KeyboardEventHandler<HTMLTextAreaElement> = (
    e,
  ) => {
    if (e.key === 'Enter') {
      const target = e.target as HTMLTextAreaElement
      target.blur()
    }
  }

  return (
    <C.Section>
      <C.TitleLabel>Code Input</C.TitleLabel>
      <C.CodeInput
        name="code"
        placeholder="Paste your code here..."
        value={formData.code}
        onChange={handleChange}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
      />
    </C.Section>
  )
}
