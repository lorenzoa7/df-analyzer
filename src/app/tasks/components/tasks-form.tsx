'use client'

import StepButtons from '@/components/step-buttons'
import { Form, FormLabel, FormMessage } from '@/components/ui/form'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { useConstrolNavigation } from '@/hooks/use-control-navigation'
import { useTransformation } from '@/hooks/use-transformation'
import { Task } from '@/lib/types'
import { useApp } from '@/providers/app-provider'
import { TasksData, tasksSchema } from '@/schemas/tasks-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useFieldArray, useForm } from 'react-hook-form'
import TasksFields from './tasks-fields'

export default function TasksForm() {
  const { goToNextStep } = useConstrolNavigation()
  const { setDataflowData, dataflowData } = useApp()
  const { getTransformationById } = useTransformation()
  const form = useForm<TasksData>({
    resolver: zodResolver(tasksSchema),
    defaultValues: {
      tasksList: dataflowData.transformations.map((transformation) => ({
        transformationId: transformation._id,
        tasks: dataflowData.tasks.filter(
          (task) => task.transformationId === transformation._id,
        ),
      })),
    },
  })

  const { fields } = useFieldArray({
    control: form.control,
    name: 'tasksList',
  })

  const onSubmit = (data: TasksData) => {
    const newTasks: Task[] = data.tasksList.flatMap((item) => {
      const tasks: Task[] = item.tasks.flatMap((task) => {
        return {
          _id: task._id,
          name: task.name,
          transformationId: item.transformationId,
          inputId: task.inputId,
          inputElement: [],
          outputElement: [],
          hasBeginStamp: false,
          hasEndStamp: false,
        }
      })

      return tasks
    })

    setDataflowData((dataflowData) => ({
      ...dataflowData,
      tasks: newTasks,
    }))
    goToNextStep()
  }

  const isDisabled = form
    .getValues('tasksList')
    .some((item) => item.tasks.length < 1)

  const redo = () => {
    setDataflowData((dataflowData) => ({
      ...dataflowData,
      tasks: [],
    }))
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormMessage />
        <Separator className="w-full" />
        <ScrollArea className="h-64 w-[44rem] p-2 2xl:h-[28rem]">
          <div className="flex flex-col gap-5 p-2">
            {fields.map((field, index) => (
              <div key={field.id}>
                <FormLabel className="font-bold">
                  {getTransformationById(fields[index].transformationId)?.name}
                </FormLabel>

                <Separator className="my-5 w-full" />

                <TasksFields
                  control={form.control}
                  nestIndex={index}
                  nestTransformationId={fields[index].transformationId}
                />
              </div>
            ))}
          </div>
        </ScrollArea>

        <StepButtons isNextDisabled={isDisabled} backFunction={redo} />
      </form>
    </Form>
  )
}
