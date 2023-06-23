'use client'

import useData from '@/hooks/useData'
import { TextareaChangeEvent } from '@/utils/types'
import * as C from './styles'

export default function CodeSection() {
  const { code, setCode } = useData()

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
