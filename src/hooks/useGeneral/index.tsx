import { GeneralContext } from '@/contexts/general'
import { useContext } from 'react'

export default function useGeneral() {
  const context = useContext(GeneralContext)

  return context
}
