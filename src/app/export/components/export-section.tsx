'use client'

import StepButtons from '@/components/step-buttons'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useExport } from '@/hooks/use-export'
import { Download } from 'lucide-react'
import CopyButton from './copy-button'

export default function ExportSection() {
  const { generateScript, downloadFile } = useExport()
  const script = generateScript()

  return (
    <div className="flex flex-col gap-2 px-2">
      <div className="mb-2 flex w-full justify-end px-2">
        <Button
          variant="ghost"
          className="h-8 w-32"
          onClick={() => downloadFile(script)}
        >
          <span>Download</span>
          <Download className="ml-2 h-4 w-4" />
        </Button>
        <CopyButton copyText={script.join('\n')} />
      </div>
      <ScrollArea className="h-[32rem] w-[64rem]">
        <ul className="flex flex-col p-2">
          {script.map((line, index) => (
            <li
              key={index}
              data-even={(index + 1) % 2 === 0}
              className="flex w-full items-center border border-zinc-200 data-[even=false]:bg-white data-[even=true]:bg-zinc-100"
            >
              <span className="w-8 bg-zinc-200 py-2 text-center text-zinc-500">
                {index + 1}
              </span>
              <span className="ml-2 w-full break-all pl-2">{line}</span>
            </li>
          ))}
        </ul>
      </ScrollArea>
      <StepButtons />
    </div>
  )
}
