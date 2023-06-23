'use client'

import { TextareaChangeEvent } from '@/utils/types'
import { useState } from 'react'
import * as C from './styles'

export default function CodeSection() {
  const [code, setCode] = useState('')

  return (
    <C.Section>
      <C.TitleLabel>Code Input</C.TitleLabel>
      <C.CodeInput
        placeholder="Paste your code here..."
        value={code}
        onChange={(e: TextareaChangeEvent) => setCode(e.target.value)}
      />
    </C.Section>
  )
}
