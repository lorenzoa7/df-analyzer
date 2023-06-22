import { DataContext } from '@/contexts/data'
import { useContext } from 'react'

export default function useData() {
  const context = useContext(DataContext)

  return context
}
