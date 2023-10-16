'use client'

import StepButtons from '@/components/step-buttons'
import { Form, FormLabel, FormMessage } from '@/components/ui/form'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { useConstrolNavigation } from '@/hooks/use-control-navigation'
import { useTask } from '@/hooks/use-task'
import { useTransformation } from '@/hooks/use-transformation'
import { Task } from '@/lib/types'
import { useApp } from '@/providers/app-provider'
import {
  TasksElementsData,
  tasksElementsSchema,
} from '@/schemas/tasks-elements-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useFieldArray, useForm } from 'react-hook-form'
import InputElementsFields from './input-elements-fields'
import OutputElementsFields from './output-elements-fields'

export default function TasksElementsForm() {
  const { goToNextStep } = useConstrolNavigation()
  const { setDataflowData, dataflowData } = useApp()
  const { getTransformationById } = useTransformation()
  const { getTaskById } = useTask()

  const form = useForm<TasksElementsData>({
    resolver: zodResolver(tasksElementsSchema),
    defaultValues: {
      tasksElementsList: dataflowData.tasks.map((task) => ({
        taskId: task._id,
        outputElements: getTransformationById(
          task.transformationId,
        )?.output.attributes.map((attribute) => {
          return {
            attributeId: attribute._id,
            variableName: '',
          }
        }),
        inputElements: getTransformationById(
          task.transformationId,
        )?.inputs.flatMap((input) => {
          return input.attributes.flatMap((attribute) => {
            return {
              inputId: input._id,
              attributeId: attribute._id,
              variableName: '',
            }
          })
        }),
      })),
    },
  })

  const { fields } = useFieldArray({
    control: form.control,
    name: 'tasksElementsList',
  })

  const onSubmit = (data: TasksElementsData) => {
    const tasksList = dataflowData.tasks

    const newTasks: Task[] = tasksList.map((task) => {
      const inputElement =
        data.tasksElementsList
          .find((item) => item.taskId === task._id)
          ?.inputElements.flatMap((element) => element.variableName) ?? []
      const outputElement =
        data.tasksElementsList
          .find((item) => item.taskId === task._id)
          ?.outputElements.flatMap((element) => element.variableName) ?? []

      return {
        ...task,
        inputElement,
        outputElement,
      }
    })

    setDataflowData((dataflowData) => ({
      ...dataflowData,
      tasks: newTasks,
      codeLines: dataflowData.code.split('\n'),
    }))
    goToNextStep()
  }

  const isDisabled = form
    .getValues('tasksElementsList')
    .some(
      (item) =>
        item.inputElements.some((element) => element.variableName === '') &&
        item.outputElements.some((element) => element.variableName === ''),
    )

  const redo = () => {
    setDataflowData((dataflowData) => ({
      ...dataflowData,
      tasks: dataflowData.tasks.map((task) => ({
        ...task,
        inputElement: [],
        outputElement: [],
      })),
    }))
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormMessage />
        <Separator className="w-full" />
        <ScrollArea className="h-[28rem] w-[44rem] p-2">
          <div className="flex flex-col gap-5 p-2">
            {fields.map((field, index) => (
              <div key={field.id}>
                <FormLabel className="text-lg font-bold">
                  {`Transformation: ${getTransformationById(
                    getTaskById(fields[index].taskId)?.transformationId ?? -1,
                  )?.name} / Task: ${getTaskById(fields[index].taskId)?.name}`}
                </FormLabel>

                <Separator className="my-5 w-full" />
                <div className="flex flex-col gap-3">
                  <OutputElementsFields
                    control={form.control}
                    nestTransformationId={
                      getTaskById(fields[index].taskId)?.transformationId ?? -1
                    }
                    nestIndex={index}
                    setValue={form.setValue}
                  />
                  <InputElementsFields
                    control={form.control}
                    nestTransformationId={
                      getTaskById(fields[index].taskId)?.transformationId ?? -1
                    }
                    nestInputId={
                      getTaskById(fields[index].taskId)?.inputId ?? -1
                    }
                    nestIndex={index}
                    setValue={form.setValue}
                  />
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        <StepButtons isNextDisabled={isDisabled} backFunction={redo} />
      </form>
    </Form>
  )
}
