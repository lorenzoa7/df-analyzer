'use client'

import useGeneral from '@/hooks/useGeneral'
import exampleAppData from '@/utils/exampleAppData.json'
import type { DataFlow } from '@/utils/types'
import Cookie from 'js-cookie'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { BarLoader } from 'react-spinners'
import * as C from './styles'

export default function LoadSection() {
  const { push } = useRouter()
  const { setAppData, appData } = useGeneral()
  const [isLoading, setIsLoading] = useState(false)
  const handleLoad = () => {
    setIsLoading(true)
    setAppData((state) => ({ ...state, codeLines: appData.code.split('\n') }))
    Cookie.set('code_preview', 'true')
    push('/code')
  }

  const handleSetExampleAppData = () => {
    setAppData(exampleAppData as DataFlow)
  }
  return (
    <>
      <C.LoadButton onClick={handleLoad}>
        {isLoading && <BarLoader />}
        {!isLoading && 'LOAD'}
      </C.LoadButton>

      <C.LoadButton onClick={handleSetExampleAppData}>Example</C.LoadButton>
    </>
  )
}
