'use client'

import useGeneral from '@/hooks/useGeneral'
import { FaPlus } from 'react-icons/fa'
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
            <C.AddTaskButton>
              <FaPlus size={'65%'} />
            </C.AddTaskButton>
          </C.CodeLine>
        ))}
      </C.LineList>
      <div className="flex w-full justify-end">
        <button className="flex items-center justify-center w-32 bg-zinc-300 h-10 rounded-lg font-bold hover:bg-zinc-400 duration-300 gap-1">
          New Task +
        </button>
      </div>
    </C.Container>
  )
}
