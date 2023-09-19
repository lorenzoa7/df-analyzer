import { TaskContext } from '@/contexts/task'
import { useContext } from 'react'

export default function useTask() {
  const context = useContext(TaskContext)

  return context
}
