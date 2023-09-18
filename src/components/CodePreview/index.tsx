'use client'

import useGeneral from '@/hooks/useGeneral'
import useTask from '@/hooks/useTask'
import useTransformation from '@/hooks/useTransformation'
import { ListEnd, ListStart, Plus } from 'lucide-react'
import { AiFillDelete } from 'react-icons/ai'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import TaskDialog from './TaskDialog'
import * as C from './styles'

export default function CodePreview() {
  const { appData } = useGeneral()
  const { setOpenTaskDialog, deleteTask, getTaskById } = useTask()
  const { getTransformationById } = useTransformation()

  const getTaskName = (taskId: number) => {
    const task = getTaskById(taskId)
    if (task) {
      return `(${task.id}) Transformation: ${getTransformationById(
        task.transformationId,
      )?.name}`
    }

    return 'Task'
  }

  return (
    <C.Container>
      <div className="flex h-full w-full gap-10">
        <C.LineList>
          {appData.codeLines.map((line, index) => (
            <C.CodeLine key={index} $even={(index + 1) % 2 === 0}>
              <C.LineNumber>{index + 1}</C.LineNumber>
              <C.CodeText>
                {typeof line === 'string' ? line : getTaskName(line.taskId)}
              </C.CodeText>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <C.AddTaskButton>
                    <Plus className="h-4 w-4" />
                  </C.AddTaskButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger
                      disabled={appData.tasks.every((task) => task.hasEndStamp)}
                    >
                      <ListStart className="mr-2 h-4 w-4" />
                      <span>Begin</span>
                    </DropdownMenuSubTrigger>
                    {!appData.tasks.every((task) => task.hasEndStamp) && (
                      <DropdownMenuPortal>
                        <DropdownMenuSubContent>
                          {appData.tasks.map((task) => {
                            if (!task.hasBeginStamp) {
                              return (
                                <DropdownMenuItem key={task.id}>
                                  {getTaskName(task.id)}
                                </DropdownMenuItem>
                              )
                            }
                            return null
                          })}
                        </DropdownMenuSubContent>
                      </DropdownMenuPortal>
                    )}
                  </DropdownMenuSub>
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger
                      disabled={appData.tasks.every((task) => task.hasEndStamp)}
                    >
                      <ListEnd className="mr-2 h-4 w-4" />
                      <span>End</span>
                    </DropdownMenuSubTrigger>
                    {!appData.tasks.every((task) => task.hasEndStamp) && (
                      <DropdownMenuPortal>
                        <DropdownMenuSubContent>
                          {appData.tasks.map((task) => {
                            if (!task.hasEndStamp) {
                              return (
                                <DropdownMenuItem key={task.id}>
                                  {getTaskName(task.id)}
                                </DropdownMenuItem>
                              )
                            }
                            return null
                          })}
                        </DropdownMenuSubContent>
                      </DropdownMenuPortal>
                    )}
                  </DropdownMenuSub>
                </DropdownMenuContent>
              </DropdownMenu>
            </C.CodeLine>
          ))}
        </C.LineList>

        <div className="scrollbar-thin scrollbar-thumb-stone-300 flex w-2/4 grow flex-col items-center gap-5 overflow-y-scroll rounded bg-stone-900 p-3 pb-4 pl-2 pt-2 text-center">
          <button
            className="h-12 w-24 flex-none rounded-xl bg-stone-100 text-3xl font-medium duration-300 hover:bg-stone-400"
            onClick={() => setOpenTaskDialog(true)}
          >
            +
          </button>

          {appData.tasks?.length === 0 ? (
            <p className="flex h-12 items-center rounded bg-stone-100/80 p-3 text-center font-semibold">
              Create new tasks
            </p>
          ) : (
            appData.tasks?.map((task) => (
              <div
                key={task.id}
                className="flex h-12 w-full items-center gap-5 rounded bg-stone-100 p-5 font-semibold duration-300"
              >
                <span className="w-full text-start">{`(${
                  task.id
                }) Transformation: ${getTransformationById(
                  task.transformationId,
                )?.name}`}</span>
                <div
                  onClick={(e) => deleteTask(e, task.id)}
                  className="flex h-8 w-8 cursor-pointer items-center justify-center rounded bg-stone-700 text-white duration-150 hover:bg-stone-900"
                >
                  <AiFillDelete size={'75%'} />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <TaskDialog />
    </C.Container>
  )
}
