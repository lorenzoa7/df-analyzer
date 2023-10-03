'use client'

import StepButtons from '@/components/step-buttons'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useConstrolNavigation } from '@/hooks/use-control-navigation'
import { useApp } from '@/providers/app-provider'
import {
  DataflowTagData,
  dataflowTagSchema,
} from '@/schemas/dataflow-tag-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

export default function TagForm() {
  const { goToNextStep } = useConstrolNavigation()
  const { setDataflowData, dataflowData } = useApp()
  const form = useForm<DataflowTagData>({
    resolver: zodResolver(dataflowTagSchema),
    defaultValues: {
      dataflowTag: dataflowData.dataflow_tag,
    },
  })

  const onSubmit = (data: DataflowTagData) => {
    setDataflowData((dataflowData) => ({
      ...dataflowData,
      dataflow_tag: data.dataflowTag,
    }))
    goToNextStep()
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="dataflowTag"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  className="w-[32rem]"
                  placeholder="Dataflow Tag..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <StepButtons />
      </form>
    </Form>
  )
}
