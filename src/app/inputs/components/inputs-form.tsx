'use client'

import StepButtons from '@/components/step-buttons'
import { Form, FormLabel, FormMessage } from '@/components/ui/form'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { useConstrolNavigation } from '@/hooks/use-control-navigation'
import { useTransformation } from '@/hooks/use-transformation'
import { useApp } from '@/providers/app-provider'
import { InputsData, inputsSchema } from '@/schemas/inputs-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useFieldArray, useForm } from 'react-hook-form'

export default function InputsForm() {
  const { goToNextStep } = useConstrolNavigation()
  const { setDataflowData, dataflowData } = useApp()
  const { getTransformationById } = useTransformation()
  const form = useForm<InputsData>({
    resolver: zodResolver(inputsSchema),
    defaultValues: {
      inputsList: dataflowData.transformations.map((transformation) => ({
        transformationId: transformation._id,
        inputs: transformation.inputs,
      })),
    },
  })

  const { fields } = useFieldArray({
    control: form.control,
    name: 'inputsList',
  })

  const onSubmit = (data: InputsData) => {
    console.log(data)
  }

  const isDisabled = form
    .getValues('inputsList')
    .some((item) => item.inputs.length < 1)

  const redo = () => {
    setDataflowData((dataflowData) => ({
      ...dataflowData,
      transformations: dataflowData.transformations.map((transformation) => ({
        ...transformation,
        inputs: [],
      })),
    }))
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormMessage />
        <Separator className="w-full" />
        <ScrollArea className="h-[28rem] w-[36rem] p-2">
          <div className="flex flex-col gap-5 p-2">
            {fields.map((field, index) => (
              <div key={field.id}>
                <FormLabel className="font-bold">
                  {getTransformationById(fields[index].transformationId)?.name}
                </FormLabel>

                <Separator className="my-5 w-full" />

                {/* <AttributesFields control={form.control} nestIndex={index} /> */}
              </div>
            ))}
          </div>
        </ScrollArea>

        <StepButtons isNextDisabled={isDisabled} backFunction={redo} />
      </form>
    </Form>
  )
}
