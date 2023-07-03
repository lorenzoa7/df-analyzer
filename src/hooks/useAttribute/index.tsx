import { AttributeContext } from '@/contexts/attribute'
import { useContext } from 'react'

export default function useAttribute() {
  const context = useContext(AttributeContext)

  return context
}
