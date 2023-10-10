import { useApp } from '@/providers/app-provider'

export const useTask = () => {
  const { dataflowData } = useApp()
  const tasksList = dataflowData.tasks
  const getTaskById = (id: number) => {
    return tasksList.find((task) => task._id === id)
  }

  return { getTaskById }
}
