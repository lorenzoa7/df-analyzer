'use client'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import useGeneral from '@/hooks/useGeneral'
import useInput from '@/hooks/useInput'
import useTask from '@/hooks/useTask'
import useTransformation from '@/hooks/useTransformation'
import { TaskData, taskSchema } from '@/schemas/task-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Dialog, DialogContent, DialogTitle } from '@mui/material'
import { useEffect, useRef } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'

export default function TaskDialog() {
  const { openTaskDialog, setOpenTaskDialog, addTask } = useTask()
  const { appData, getVariableNames } = useGeneral()
  const { getNumberOfOutputAttributes, getTransformationById } =
    useTransformation()
  const { getNumberOfInputAttributes, getInputById } = useInput()

  const form = useForm<TaskData>({
    mode: 'onSubmit',
    resolver: zodResolver(taskSchema),
    defaultValues: {
      transformationId: 1,
      outputElement: [],
      inputId: 1,
      inputElement: [],
    },
  })

  const onSubmit = (data: TaskData) => {
    console.log(data)
  }

  const outputElementFieldArray = useFieldArray({
    control: form.control,
    name: 'outputElement',
  })

  const inputElementFieldArray = useFieldArray({
    control: form.control,
    name: 'inputElement',
  })

  const selectedTransformationId = form.watch('transformationId')
  const selectedInputId = form.watch('inputId')
  const outputElementFieldArrayRef = useRef(outputElementFieldArray)
  const inputElementFieldArrayRef = useRef(inputElementFieldArray)

  useEffect(() => {
    const defaultFields = Array.from(
      { length: getNumberOfOutputAttributes(Number(selectedTransformationId)) },
      () => ({ variableName: getVariableNames()[0].variableName }),
    )
    outputElementFieldArrayRef.current.replace(defaultFields)
  }, [selectedTransformationId, getNumberOfOutputAttributes, getVariableNames])

  useEffect(() => {
    const defaultFields = Array.from(
      {
        length: getNumberOfInputAttributes(
          Number(selectedTransformationId),
          Number(selectedInputId),
        ),
      },
      () => ({ variableName: getVariableNames()[0].variableName }),
    )
    inputElementFieldArrayRef.current.replace(defaultFields)
  }, [
    selectedTransformationId,
    selectedInputId,
    getNumberOfInputAttributes,
    getVariableNames,
  ])

  return (
    <Dialog
      open={openTaskDialog}
      onClose={() => setOpenTaskDialog(false)}
      fullWidth={true}
      maxWidth={'sm'}
      className="z-10"
    >
      <DialogTitle>Create new task</DialogTitle>
      <DialogContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex w-full flex-col items-center justify-center gap-3 p-5"
          >
            <FormField
              control={form.control}
              name="transformationId"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="text-base">
                    Select the transformation
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={String(field.value)}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select the transformation" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {appData.transformations.map((transformation) => (
                        <SelectItem
                          key={transformation.id}
                          value={String(transformation.id)}
                        >
                          {transformation.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="inputId"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="text-base">Select the input</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={String(field.value)}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select the input" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {getTransformationById(
                        Number(selectedTransformationId),
                      )?.inputs?.map((input) => (
                        <SelectItem key={input.id} value={String(input.id)}>
                          {input.transformationOutputReferenceId
                            ? getTransformationById(
                                input.transformationOutputReferenceId,
                              )?.output.name
                            : input.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />

            {inputElementFieldArray.fields.length > 0 && (
              <FormLabel className="self-start text-base">
                Define input element
              </FormLabel>
            )}
            {inputElementFieldArray.fields.length > 0 &&
              inputElementFieldArray.fields.map((field, index) => (
                <FormField
                  key={field.id}
                  control={form.control}
                  name={`inputElement.${index}.variableName`}
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="self-start text-xs">
                        {`Associate "${getInputById(
                          Number(selectedTransformationId),
                          Number(selectedInputId),
                        )?.attributes[index]?.name}" attribute to a variable`}
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={getVariableNames()[0].variableName}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Define input element" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {getVariableNames().map((variable, index) => (
                            <SelectItem
                              key={index}
                              value={variable.variableName}
                            >
                              {variable.variableName}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}

            {outputElementFieldArray.fields.length > 0 && (
              <FormLabel className="self-start text-base">
                Define output element
              </FormLabel>
            )}
            {outputElementFieldArray.fields.length &&
              outputElementFieldArray.fields.map((field, index) => (
                <FormField
                  key={field.id}
                  control={form.control}
                  name={`outputElement.${index}.variableName`}
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="self-start text-xs">
                        {`Associate "${getTransformationById(
                          Number(selectedTransformationId),
                        )?.output.attributes[index]
                          ?.name}" attribute to a variable`}
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={getVariableNames()[0].variableName}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Define the input elements" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {getVariableNames().map((variable, index) => (
                            <SelectItem
                              key={index}
                              value={variable.variableName}
                            >
                              {variable.variableName}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}

            <Button type="submit" className="w-1/2">
              Create
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
