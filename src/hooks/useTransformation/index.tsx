import { TransformationContext } from '@/contexts/transformation'
import { useContext } from 'react'

export default function useTransformation() {
  const context = useContext(TransformationContext)

  return context
}
