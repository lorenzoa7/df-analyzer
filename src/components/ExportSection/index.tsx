'use client'

import Cookie from 'js-cookie'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { BarLoader } from 'react-spinners'
import * as C from './styles'

export default function ExportSection() {
  const { push } = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleBack = () => {
    setIsLoading(true)
    Cookie.remove('code_preview')
    push('/')
  }

  return (
    <C.Container>
      <C.BackButton onClick={handleBack}>
        {isLoading && <BarLoader />}
        {!isLoading && 'GO BACK'}
      </C.BackButton>

      <C.ExportButton>EXPORT</C.ExportButton>

      <C.BackButton className="invisible">
        {isLoading && <BarLoader />}
        {!isLoading && 'GO BACK'}
      </C.BackButton>
    </C.Container>
  )
}
