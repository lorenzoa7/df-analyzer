'use client'

import StepButtons from '@/components/step-buttons'
import { Form, FormLabel, FormMessage } from '@/components/ui/form'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { useConstrolNavigation } from '@/hooks/use-control-navigation'
import { useInput } from '@/hooks/use-input'
import { useTransformation } from '@/hooks/use-transformation'
import { useApp } from '@/providers/app-provider'
import {
  InputsAttributesData,
  inputsAttributesSchema,
} from '@/schemas/inputs-attributes-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useFieldArray, useForm } from 'react-hook-form'

export default function InputsAttributesForm() {
  const { goToNextStep } = useConstrolNavigation()
  const { setDataflowData, dataflowData } = useApp()
  const { getTransformationById } = useTransformation()
  const { getInputById } = useInput()
  const form = useForm<InputsAttributesData>({
    resolver: zodResolver(inputsAttributesSchema),
    defaultValues: {
      inputsAttributes: dataflowData.transformations.flatMap((transformation) =>
        transformation.inputs.map((input) => ({
          transformationId: transformation._id,
          inputId: input._id,
          attributes:
            getInputById(transformation._id, input._id)?.attributes ?? [],
        })),
      ),
    },
  })

  const { fields } = useFieldArray({
    control: form.control,
    name: 'inputsAttributes',
  })

  const onSubmit = (data: InputsAttributesData) => {
    console.log(data)
  }

  const isDisabled = form
    .getValues('inputsAttributes')
    .some((item) => item.attributes.length < 1)

  const redo = () => {
    setDataflowData((dataflowData) => ({
      ...dataflowData,
      transformations: dataflowData.transformations.map((transformation) => ({
        ...transformation,
        inputs: transformation.inputs.map((input) => ({
          ...input,
          attributes: [],
        })),
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
                  {
                    getTransformationById(fields[index].transformationId)
                      ?.output.name
                  }
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
