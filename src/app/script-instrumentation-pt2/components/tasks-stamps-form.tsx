'use client'

import StepButtons from '@/components/step-buttons'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Form, FormMessage } from '@/components/ui/form'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { useConstrolNavigation } from '@/hooks/use-control-navigation'
import { useTask } from '@/hooks/use-task'
import { CodeStamp, Stamp, Task } from '@/lib/types'
import { useApp } from '@/providers/app-provider'
import {
  TasksStampsData,
  tasksStampsSchema,
} from '@/schemas/tasks-stamps-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { ListEnd, ListStart, MoreVertical, Trash } from 'lucide-react'
import { useFieldArray, useForm } from 'react-hook-form'

type InsertStampProps = {
  index: number
  taskId: number
  transformationId: number
  stamp: Stamp
}

type RemoveStampProps = {
  index: number
  taskId: number
  stamp: Stamp
}

export default function TasksStampsForm() {
  const { goToNextStep } = useConstrolNavigation()
  const { setDataflowData, dataflowData } = useApp()
  const { getTaskById } = useTask()
  const form = useForm<TasksStampsData>({
    resolver: zodResolver(tasksStampsSchema),
    defaultValues: {
      codeLinesList: dataflowData.codeLines.map((line) => {
        if (typeof line === 'string') {
          return {
            type: 'code',
            code: line,
          }
        }

        return {
          type: 'stamp',
          taskId: line.taskId,
          transformationId: line.transformationId,
          stamp: line.stamp,
        }
      }),
    },
  })

  const { fields, insert, remove } = useFieldArray({
    control: form.control,
    name: 'codeLinesList',
  })

  const onSubmit = (data: TasksStampsData) => {
    const newCodeLines: (string | CodeStamp)[] = data.codeLinesList.map(
      (item) => {
        if (item.type === 'code') return item.code
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { type: _, ...updatedStamp } = item
        return updatedStamp
      },
    )

    setDataflowData((dataflowData) => ({
      ...dataflowData,
      codeLines: newCodeLines,
    }))
    goToNextStep()
  }

  const isDisabled = dataflowData.tasks.some(
    (task) => !task.hasBeginStamp || !task.hasEndStamp,
  )

  const redo = () => {
    setDataflowData((dataflowData) => ({
      ...dataflowData,
      codeLines: [],
      tasks: dataflowData.tasks.map((task) => ({
        ...task,
        hasBeginStamp: false,
        hasEndStamp: false,
      })),
    }))
  }

  const insertStamp = ({
    index,
    taskId,
    transformationId,
    stamp,
  }: InsertStampProps) => {
    insert(index, {
      type: 'stamp',
      taskId,
      transformationId,
      stamp,
    })

    const newTasks: Task[] = dataflowData.tasks.map((task) => {
      if (task._id === taskId) {
        if (stamp === 'begin') {
          return {
            ...task,
            hasBeginStamp: true,
          }
        }
        return {
          ...task,
          hasEndStamp: true,
        }
      }
      return task
    })

    setDataflowData((dataflowData) => ({
      ...dataflowData,
      tasks: newTasks,
    }))
  }

  const removeStamp = ({ index, taskId, stamp }: RemoveStampProps) => {
    remove(index)

    const newTasks: Task[] = dataflowData.tasks.map((task) => {
      if (task._id === taskId) {
        if (stamp === 'begin') {
          return {
            ...task,
            hasBeginStamp: false,
          }
        }
        return {
          ...task,
          hasEndStamp: false,
        }
      }
      return task
    })

    setDataflowData((dataflowData) => ({
      ...dataflowData,
      tasks: newTasks,
    }))
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormMessage />
        <Separator className="w-full" />
        <ScrollArea className="h-80 w-[64rem] p-2 2xl:h-[32rem]">
          <ul className="flex flex-col p-2">
            {fields.map((field, index) => {
              const line = fields[index]
              return (
                <li
                  key={field.id}
                  data-type={line.type}
                  className="flex w-full items-center border border-zinc-200 data-[type='code']:bg-white data-[type='stamp']:bg-zinc-300"
                >
                  <span className="w-8 bg-zinc-100 py-2 text-center text-zinc-500">
                    {index + 1}
                  </span>
                  <span className="ml-2 w-full break-all pl-2">
                    {line.type === 'code'
                      ? line.code
                      : `${line.stamp.toUpperCase()}: ${getTaskById(line.taskId)
                          ?.name}`}
                  </span>

                  {!(
                    dataflowData.tasks.every(
                      (task) => task.hasBeginStamp && task.hasEndStamp,
                    ) && line.type === 'code'
                  ) && (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="mr-2 focus-visible:ring-0 focus-visible:ring-offset-0"
                        >
                          <MoreVertical className="h-5 w-5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        {!dataflowData.tasks.every(
                          (task) => task.hasBeginStamp,
                        ) && (
                          <DropdownMenuSub>
                            <DropdownMenuSubTrigger
                              disabled={dataflowData.tasks.every(
                                (task) => task.hasBeginStamp,
                              )}
                            >
                              <ListStart className="mr-2 h-4 w-4" />
                              <span>Begin</span>
                            </DropdownMenuSubTrigger>

                            <DropdownMenuPortal>
                              <DropdownMenuSubContent>
                                {dataflowData.tasks.map((task) => {
                                  if (!task.hasBeginStamp) {
                                    return (
                                      <DropdownMenuItem
                                        key={task._id}
                                        onClick={() =>
                                          insertStamp({
                                            index,
                                            taskId: task._id,
                                            transformationId:
                                              task.transformationId,
                                            stamp: 'begin',
                                          })
                                        }
                                      >
                                        {getTaskById(task._id)?.name}
                                      </DropdownMenuItem>
                                    )
                                  }
                                  return null
                                })}
                              </DropdownMenuSubContent>
                            </DropdownMenuPortal>
                          </DropdownMenuSub>
                        )}
                        {!dataflowData.tasks.every(
                          (task) => task.hasEndStamp,
                        ) && (
                          <DropdownMenuSub>
                            <DropdownMenuSubTrigger
                              disabled={dataflowData.tasks.every(
                                (task) => task.hasEndStamp,
                              )}
                            >
                              <ListEnd className="mr-2 h-4 w-4" />
                              <span>End</span>
                            </DropdownMenuSubTrigger>

                            <DropdownMenuPortal>
                              <DropdownMenuSubContent>
                                {dataflowData.tasks.map((task) => {
                                  if (!task.hasEndStamp) {
                                    return (
                                      <DropdownMenuItem
                                        key={task._id}
                                        onClick={() =>
                                          insertStamp({
                                            index: index + 1,
                                            taskId: task._id,
                                            transformationId:
                                              task.transformationId,
                                            stamp: 'end',
                                          })
                                        }
                                      >
                                        {getTaskById(task._id)?.name}
                                      </DropdownMenuItem>
                                    )
                                  }
                                  return null
                                })}
                              </DropdownMenuSubContent>
                            </DropdownMenuPortal>
                          </DropdownMenuSub>
                        )}
                        {line.type === 'stamp' && (
                          <DropdownMenuItem
                            onClick={() =>
                              removeStamp({
                                index,
                                taskId: line.taskId,
                                stamp: line.stamp,
                              })
                            }
                          >
                            <Trash className="mr-2 h-4 w-4" />
                            <span>Delete</span>
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </li>
              )
            })}
          </ul>
        </ScrollArea>

        <StepButtons isNextDisabled={isDisabled} backFunction={redo} />
      </form>
    </Form>
  )
}
