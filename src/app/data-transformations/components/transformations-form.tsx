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
import { defaultDataflowData } from '@/config/defaults'
import { extractIds } from '@/functions/extract-ids'
import { newId } from '@/functions/new-id'
import { useConstrolNavigation } from '@/hooks/use-control-navigation'
import { Transformation } from '@/lib/types'
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

    const newTransformations: Transformation[] = data.transformations.map(
      (transformation, index) => ({
        _id: newId({
          idList: extractIds(transformationsList),
          modifier: index,
        }),
        name: transformation.name,
        inputs: [],
        output: {
          name: `o${transformation.name}`,
          attributes: [],
        },
      }),
    )

    setDataflowData((dataflowData) => ({
      ...dataflowData,
      transformations: newTransformations,
    }))
    goToNextStep()
  }

  const isDisabled =
    !form.formState.isDirty &&
    form.getValues('transformations').length ===
      defaultDataflowData.transformations.length
  const redo = () => {
    setDataflowData((dataflowData) => ({
      ...dataflowData,
      transformations: defaultDataflowData.transformations,
    }))
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <Button
          variant="secondary"
          type="button"
          onClick={() => append({ name: '' })}
          className="w-full"
        >
          <Plus className="mr-2 w-4" />
          <span>Add</span>
        </Button>
        <FormMessage />
        <Separator className="w-full" />
        <ScrollArea className="h-60 w-[36rem] p-2 2xl:h-[26rem]">
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

        <StepButtons isNextDisabled={isDisabled} backFunction={redo} />
      </form>
    </Form>
  )
}
