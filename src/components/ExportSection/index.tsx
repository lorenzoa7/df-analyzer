'use client'

import Cookie from 'js-cookie'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { BarLoader } from 'react-spinners'
import * as C from './styles'

export default function ExportSection() {
  const { push } = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const handleLoad = () => {
    setIsLoading(true)
    Cookie.remove('code_preview')
    push('/')
  }
  return (
    <C.ExportButton onClick={handleLoad}>
      {isLoading && <BarLoader />}
      {!isLoading && 'EXPORT'}
    </C.ExportButton>
  )
}
