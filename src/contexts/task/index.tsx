import { findHighestId } from '@/functions'
import useGeneral from '@/hooks/useGeneral'
import { Task } from '@/utils/types'
import { Dispatch, SetStateAction, createContext, useState } from 'react'

export type TaskContextProps = {
  openTaskDialog: boolean
  setOpenTaskDialog: Dispatch<SetStateAction<boolean>>
  selectedTask: Task | null
  setSelectedTask: Dispatch<SetStateAction<Task | null>>
  getTaskById: (id: number) => Task | undefined
  addTask: () => void
}

const TaskContext = createContext<TaskContextProps>({} as TaskContextProps)

const TaskProvider = ({ children }: { children: React.ReactNode }) => {
  const { appData, setAppData } = useGeneral()

  const [openTaskDialog, setOpenTaskDialog] = useState(false)

  const [selectedTask, setSelectedTask] = useState<Task | null>(null)

  const getTaskById = (id: number): Task | undefined => {
    return appData.tasks.find((task) => task.id === id)
  }

  const addTask = (): void => {
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

  return (
    <TaskContext.Provider
      value={{
        openTaskDialog,
        setOpenTaskDialog,
        selectedTask,
        setSelectedTask,
        getTaskById,
        addTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  )
}

export { TaskContext, TaskProvider }
