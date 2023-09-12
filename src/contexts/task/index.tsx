import { findHighestId } from '@/functions'
import useGeneral from '@/hooks/useGeneral'
import { Task } from '@/utils/types'
import { Dispatch, SetStateAction, createContext, useState } from 'react'

export type TaskContextProps = {
  openTaskDialog: boolean
  setOpenTaskDialog: Dispatch<SetStateAction<boolean>>
  getTaskById: (id: number) => Task | undefined
  addTask: () => void
  deleteTask: (taskId: number) => void
}

const TaskContext = createContext<TaskContextProps>({} as TaskContextProps)

const TaskProvider = ({ children }: { children: React.ReactNode }) => {
  const { appData, setAppData } = useGeneral()

  const [openTaskDialog, setOpenTaskDialog] = useState(false)

  const getTaskById = (id: number): Task | undefined => {
    return appData.tasks.find((task) => task.id === id)
  }

  const addTask = () => {
    const tasksList = appData.tasks
    const newTask: Task = {
      id: findHighestId(tasksList) + 1,
      transformationId: 1,
      inputElement: null,
      outputElement: [''],
    }

    setAppData({
      ...appData,
      tasks: tasksList.concat(newTask),
    })
  }

  const deleteTask = (taskId: number) => {
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
