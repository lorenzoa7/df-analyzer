'use client'

import useGeneral from '@/hooks/useGeneral'
import * as C from './styles'

export default function CodePreview() {
  const { appData } = useGeneral()
  const codeLines = appData.code.split('\n')

  return (
    <C.Container>
      <C.LineList>
        {codeLines.map((line, index) => (
          <C.CodeLine key={index} $even={(index + 1) % 2 === 0}>
            <C.LineNumber>{index + 1}</C.LineNumber>
            <C.CodeText>{line}</C.CodeText>
          </C.CodeLine>
        ))}
      </C.LineList>
    </C.Container>
  )
}
