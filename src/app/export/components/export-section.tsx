'use client'

import StepButtons from '@/components/step-buttons'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { defaultDataflowData } from '@/config/defaults'
import { siteSteps } from '@/config/site'
import { useConstrolNavigation } from '@/hooks/use-control-navigation'
import { useExport } from '@/hooks/use-export'
import { useApp } from '@/providers/app-provider'
import { Download, RotateCcw } from 'lucide-react'
import CopyButton from './copy-button'

export default function ExportSection() {
  const { generateScript, downloadFile } = useExport()
  const { goToStep } = useConstrolNavigation()
  const { setDataflowData } = useApp()
  const script = generateScript()

  const resetData = () => {
    setDataflowData(defaultDataflowData)
    goToStep(siteSteps[0])
  }

  return (
    <section className="flex flex-col items-center gap-2 px-2">
      <div className="mb-2 flex w-full justify-end px-2">
        <Button
          type="button"
          variant="ghost"
          className="h-8 w-32"
          onClick={() => downloadFile(script)}
        >
          <span>Download</span>
          <Download className="ml-2 h-4 w-4" />
        </Button>
        <CopyButton copyText={script.join('\n')} />
      </div>
      <ScrollArea className="h-64 w-[72rem] 2xl:h-[30rem]">
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
      <div className="flex w-full items-center justify-between">
        <StepButtons />
        <Button className="w-72" onClick={resetData}>
          <span>Create another script</span>
          <RotateCcw className="ml-2 w-4" />
        </Button>
      </div>
    </section>
  )
}
