'use client'

import StepButtons from '@/components/step-buttons'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { defaultTransformation } from '@/config/defaults'
import { newId } from '@/functions/new-id'
import { useConstrolNavigation } from '@/hooks/use-control-navigation'
import { useApp } from '@/providers/app-provider'
import {
  TransformationsData,
  transformationsSchema,
} from '@/schemas/transformations-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Plus, X } from 'lucide-react'
import { useFieldArray, useForm } from 'react-hook-form'

export default function TransformationsForm() {
  const { goToNextStep } = useConstrolNavigation()
  const { setDataflowData, dataflowData } = useApp()
  const form = useForm<TransformationsData>({
    resolver: zodResolver(transformationsSchema),
    defaultValues: {
      transformations: dataflowData.transformations,
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'transformations',
  })

  const onSubmit = (data: TransformationsData) => {
    const transformationsList = dataflowData.transformations

    const newTransformations = data.transformations.map(
      (transformation, index) => ({
        ...defaultTransformation,
        id: newId({ idList: transformationsList, modifier: index }),
        name: transformation.name,
      }),
    )

    setDataflowData((dataflowData) => ({
      ...dataflowData,
      transformations: newTransformations,
    }))
    goToNextStep()
  }

  const isDisabled = !form.formState.isDirty

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <Button
          variant="secondary"
          type="button"
          onClick={() => append({ name: '' })}
          className="w-[32rem]"
        >
          <Plus className="mr-2 w-4" />
          <span>Add</span>
        </Button>
        <FormMessage />
        <Separator className="w-[32rem]" />
        <ScrollArea className="h-96 p-2">
          <div className="flex flex-col gap-5 p-2">
            {fields.map((field, index) => (
              <FormField
                key={field.id}
                control={form.control}
                name={`transformations.${index}.name`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex items-center gap-2">
                        <Input
                          className="w-full"
                          placeholder="Transformation name..."
                          {...field}
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          onClick={() => remove(index)}
                        >
                          <X className="w-4" />
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
          </div>
        </ScrollArea>

        <StepButtons isNextDisabled={isDisabled} />
      </form>
    </Form>
  )
}
