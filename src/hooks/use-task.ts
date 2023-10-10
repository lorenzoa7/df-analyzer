import { useApp } from '@/providers/app-provider'

export const useTask = () => {
  const { dataflowData } = useApp()

  const getTaskById = (id: number) => {
    const tasksList = dataflowData.tasks
    return tasksList.find((task) => task._id === id)
  }

  return { getTaskById }
}
