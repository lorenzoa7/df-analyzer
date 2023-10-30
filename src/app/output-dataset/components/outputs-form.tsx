'use client'

import StepButtons from '@/components/step-buttons'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { defaultOutput, defaultTransformation } from '@/config/defaults'
import { useConstrolNavigation } from '@/hooks/use-control-navigation'
import { useTransformation } from '@/hooks/use-transformation'
import { useApp } from '@/providers/app-provider'
import { OutputsData, outputsSchema } from '@/schemas/outputs-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useFieldArray, useForm } from 'react-hook-form'

export default function OutputsForm() {
  const { goToNextStep } = useConstrolNavigation()
  const { setDataflowData, dataflowData } = useApp()
  const { getTransformationById } = useTransformation()
  const form = useForm<OutputsData>({
    resolver: zodResolver(outputsSchema),
    defaultValues: {
      outputs: dataflowData.transformations.map((transformation) => ({
        ...transformation.output,
        transformationId: transformation._id,
      })),
    },
  })

  const { fields } = useFieldArray({
    control: form.control,
    name: 'outputs',
  })

  const onSubmit = (data: OutputsData) => {
    const transformationsList = dataflowData.transformations

    const newTransformations = transformationsList.flatMap((transformation) => {
      const output = data.outputs.find(
        (output) => output.transformationId === transformation._id,
      )

      if (output) {
        return {
          ...transformation,
          output: { ...defaultOutput, name: output.name },
        }
      }

      return []
    })

    if (
      newTransformations &&
      newTransformations.length === transformationsList.length
    ) {
      setDataflowData((dataflowData) => ({
        ...dataflowData,
        transformations: newTransformations,
      }))
      goToNextStep()
    }
  }

  const isDisabled =
    form.getValues('outputs').filter((output) => output.name.length > 0)
      .length < dataflowData.transformations.length

  const redo = () => {
    setDataflowData((dataflowData) => ({
      ...dataflowData,
      transformations: dataflowData.transformations.map((transformation) => ({
        ...transformation,
        output: defaultTransformation.output,
      })),
    }))
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormMessage />
        <Separator className="w-full" />
        <ScrollArea className="h-64 w-[36rem] p-2 2xl:h-[26rem]">
          <div className="flex flex-col gap-5 p-2">
            {fields.map((field, index) => (
              <FormField
                key={field.id}
                control={form.control}
                name={`outputs.${index}.name`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex flex-col gap-2">
                        <FormLabel className="font-bold">
                          {
                            getTransformationById(
                              fields[index].transformationId,
                            )?.name
                          }
                        </FormLabel>
                        <Input
                          className="w-full"
                          placeholder="Output name..."
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
          </div>
        </ScrollArea>

        <StepButtons isNextDisabled={isDisabled} backFunction={redo} />
      </form>
    </Form>
  )
}
