import { InputContext } from '@/contexts/input'
import { useContext } from 'react'

export default function useInput() {
  const context = useContext(InputContext)

  return context
}
