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
        <button className="flex h-10 w-32 items-center justify-center gap-1 rounded-lg bg-zinc-300 font-bold duration-300 hover:bg-zinc-400">
          New Task +
        </button>
      </div>
    </C.Container>
  )
}
