'use client'

import StepButtons from '@/components/step-buttons'
import { Form, FormLabel, FormMessage } from '@/components/ui/form'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { useConstrolNavigation } from '@/hooks/use-control-navigation'
import { useTransformation } from '@/hooks/use-transformation'
import { useApp } from '@/providers/app-provider'
import {
  OutputsAttributesData,
  outputsAttributesSchema,
} from '@/schemas/outputs-attributes-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useFieldArray, useForm } from 'react-hook-form'
import AttributesFields from './attributes-fields'

export default function OutputsAttributesForm() {
  const { goToNextStep } = useConstrolNavigation()
  const { setDataflowData, dataflowData } = useApp()
  const { getTransformationById } = useTransformation()
  const form = useForm<OutputsAttributesData>({
    resolver: zodResolver(outputsAttributesSchema),
    defaultValues: {
      outputsAttributes: dataflowData.transformations.map((transformation) => ({
        transformationId: transformation._id,
        attributes: transformation.output.attributes,
      })),
    },
  })

  const { fields } = useFieldArray({
    control: form.control,
    name: 'outputsAttributes',
  })

  const onSubmit = (data: OutputsAttributesData) => {
    const transformationsList = dataflowData.transformations

    const newTransformations = transformationsList.flatMap((transformation) => {
      const list = data.outputsAttributes.find(
        (output) => output.transformationId === transformation._id,
      )

      if (list) {
        return {
          ...transformation,
          output: { ...transformation.output, attributes: list.attributes },
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

  const isDisabled = form
    .getValues('outputsAttributes')
    .some((item) => item.attributes.length < 1)

  const redo = () => {
    setDataflowData((dataflowData) => ({
      ...dataflowData,
      transformations: dataflowData.transformations.map((transformation) => ({
        ...transformation,
        output: { ...transformation.output, attributes: [] },
      })),
    }))
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormMessage />
        <Separator className="w-full" />
        <ScrollArea className="h-72 w-[36rem] p-2 2xl:h-[28rem]">
          <div className="flex flex-col gap-5 p-2">
            {fields.map((field, index) => (
              <div key={field.id}>
                <FormLabel className="font-bold">
                  {
                    getTransformationById(fields[index].transformationId)
                      ?.output.name
                  }
                </FormLabel>

                <Separator className="my-5 w-full" />

                <AttributesFields control={form.control} nestIndex={index} />
              </div>
            ))}
          </div>
        </ScrollArea>

        <StepButtons isNextDisabled={isDisabled} backFunction={redo} />
      </form>
    </Form>
  )
}
