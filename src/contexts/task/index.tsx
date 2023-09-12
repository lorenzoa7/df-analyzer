import useGeneral from '@/hooks/useGeneral'
import { Task } from '@/utils/types'
import { Dispatch, SetStateAction, createContext, useState } from 'react'

export type TaskContextProps = {
  openTaskDialog: boolean
  setOpenTaskDialog: Dispatch<SetStateAction<boolean>>
  getTaskById: (id: number) => Task | undefined
  addTask: (task: Task) => void
  deleteTask: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    taskId: number,
  ) => void
}

const TaskContext = createContext<TaskContextProps>({} as TaskContextProps)

const TaskProvider = ({ children }: { children: React.ReactNode }) => {
  const { appData, setAppData } = useGeneral()

  const [openTaskDialog, setOpenTaskDialog] = useState(false)

  const getTaskById = (id: number): Task | undefined => {
    return appData.tasks.find((task) => task.id === id)
  }

  const addTask = (task: Task) => {
    const tasksList = appData.tasks
    setAppData({
      ...appData,
      tasks: tasksList.concat(task),
    })
  }

  const deleteTask = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    taskId: number,
  ) => {
    e.stopPropagation()
    const tasksList = appData.tasks
    const updatedTasks = tasksList.filter((task) => task.id !== taskId)

    setAppData({
      ...appData,
      tasks: updatedTasks,
    })
  }

  return (
    <TaskContext.Provider
      value={{
        openTaskDialog,
        setOpenTaskDialog,
        getTaskById,
        addTask,
        deleteTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  )
}

export { TaskContext, TaskProvider }
