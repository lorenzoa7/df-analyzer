'use client'

import StepButtons from '@/components/step-buttons'
import { Form, FormMessage } from '@/components/ui/form'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { useConstrolNavigation } from '@/hooks/use-control-navigation'
import { useTask } from '@/hooks/use-task'
import { useTransformation } from '@/hooks/use-transformation'
import { useApp } from '@/providers/app-provider'
import {
  TasksStampsData,
  tasksStampsSchema,
} from '@/schemas/tasks-stamps-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useFieldArray, useForm } from 'react-hook-form'

export default function TasksStampsForm() {
  const { goToNextStep } = useConstrolNavigation()
  const { setDataflowData, dataflowData } = useApp()
  const { getTransformationById } = useTransformation()
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

  const { fields } = useFieldArray({
    control: form.control,
    name: 'codeLinesList',
  })

  const onSubmit = (data: TasksStampsData) => {
    console.log(data)
  }

  const isDisabled = form
    .getValues('codeLinesList')
    .every((item) => typeof item === 'string')

  const redo = () => {
    setDataflowData((dataflowData) => ({
      ...dataflowData,
      codeLines: [],
    }))
  }

  console.log(fields)

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormMessage />
        <Separator className="w-full" />
        <ScrollArea className="h-[28rem] w-[44rem] p-2">
          <ul className="flex flex-col p-2">
            {fields.map((field, index) => {
              const line = fields[index]
              return (
                <li
                  key={field.id}
                  data-even={(index + 1) % 2 === 0}
                  className="group flex w-full items-center px-4 py-2 data-[even=false]:bg-zinc-300 data-[even=true]:bg-zinc-100"
                >
                  <span className="w-8 text-zinc-500">{index + 1}</span>
                  <span className="ml-2 w-full">
                    {line.type === 'code'
                      ? line.code
                      : `${line.stamp}: ${getTaskById(line.taskId)?.name}`}
                  </span>
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
