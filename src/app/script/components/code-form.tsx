'use client'

import StepButtons from '@/components/step-buttons'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { defaultDataflowData } from '@/config/defaults'
import { useConstrolNavigation } from '@/hooks/use-control-navigation'
import { useApp } from '@/providers/app-provider'
import { CodeData, codeSchema } from '@/schemas/code-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

export default function CodeForm() {
  const { goToNextStep } = useConstrolNavigation()
  const { setDataflowData, dataflowData } = useApp()
  const form = useForm<CodeData>({
    resolver: zodResolver(codeSchema),
    defaultValues: {
      code: dataflowData.code,
    },
  })

  const onSubmit = (data: CodeData) => {
    setDataflowData((dataflowData) => ({ ...dataflowData, code: data.code }))
    goToNextStep()
  }
  const isDisabled =
    !form.formState.isDirty &&
    form.getValues('code') === defaultDataflowData.code

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  className="h-64 w-[32rem] resize-none"
                  placeholder="Paste here..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <StepButtons isNextDisabled={isDisabled} />
      </form>
    </Form>
  )
}
