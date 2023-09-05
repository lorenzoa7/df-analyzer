'use client'

import Cookie from 'js-cookie'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { BarLoader } from 'react-spinners'
import * as C from './styles'

export default function LoadSection() {
  const { push } = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const handleLoad = () => {
    setIsLoading(true)
    Cookie.set('code_preview', 'true')
    push('/code')
  }
  return (
    <C.LoadButton onClick={handleLoad}>
      {isLoading && <BarLoader />}
      {!isLoading && 'LOAD'}
    </C.LoadButton>
  )
}
